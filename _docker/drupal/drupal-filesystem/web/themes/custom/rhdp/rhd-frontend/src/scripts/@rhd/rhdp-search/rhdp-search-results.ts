import RHElement from '@rhelements/rhelement';
import RHDPSearchResult from './rhdp-search-result';

export default class RHDPSearchResults extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
        <style>
            :host {
                grid-area: results;
            }
        </style>
        <div class="results">
            ${!el.valid ? `
            <div class="invalidMsg">
            <h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>
            <p>After you enter a search term in the box above, you will see the results displayed here. 
            You can also use the filters to select a content type, product or topic to see some results too. 
            Try it out!</p>
            </div>` : ''}
        </div>`;
        return tpl;
    }
    _results;
    _more = false;
    _last = 0;
    _valid = true;

    get results() {
        return this._results;
    }

    set results(val) {
        if (this._results === val) return;
        this._results = val;
        this._renderResults(false);
    }

    get more() {
        return this._more;
    }
    set more(val) {
        if (this._more === val) return;
        this._more = val;
    }

    get last() {
        return this._last;
    }

    set last(val) {
        if (this._last === val) return;
        this._last = val ? val : 0;
        this.setAttribute('last', val.toString())
    }

    get valid() {
        return this._valid;
    }
    set valid(val) {
        if (this._valid === val) return;
        this._valid = val;
    }

    invalidMsg = document.createElement('div');
    loadMore = document.createElement('div');
    endOfResults = document.createElement('div');
    loading = document.createElement('div');

    constructor() {
        super('rhdp-search-results');

        this._renderResults = this._renderResults.bind(this);
        this._setLoading = this._setLoading.bind(this);
        this._checkValid = this._checkValid.bind(this);
        this._clearResults = this._clearResults.bind(this);
    }

    connectedCallback() {
        super.render(this.template(this));
        //this.setAttribute('data-rhd-col', '5span9');
        // this.invalidMsg.className = 'invalidMsg';
        // this.invalidMsg.innerHTML = `<h4>Well, this is awkward. No search term was entered yet, so this page is a little empty right now.</h4>
        // <p>After you enter a search term in the box above, you will see the results displayed here. 
        // You can also use the filters to select a content type, product or topic to see some results too. Try it out!</p>`;
        this.endOfResults.innerHTML = '<p class="end-of-results">- End of Results -</p>'
        this.loadMore.className = 'moreBtn';
        this.loadMore.innerHTML = '<a class="moreBtn" href="#">Load More</a>';
        this.loading.className = 'loading';

        this.loadMore.addEventListener('click', e => {
            e.preventDefault();
            let evt = {
                detail: {
                    from: this.last
                },
                bubbles: true,
                composed: true
            };
            this.dispatchEvent(new CustomEvent('load-more', evt));
        });

        top.addEventListener('search-complete', this._renderResults);
        top.addEventListener('search-start', this._setLoading);
        top.addEventListener('params-ready', this._checkValid);
        top.window.addEventListener('popstate', this._clearResults);
        this.shadowRoot.addEventListener('load-more', e => { 
            this.more = true; 
        });
    }

    addResult(result) {
        var item = new RHDPSearchResult();
        item.result = result;
        this.shadowRoot.querySelector('.results').appendChild(item);
    }

    _setLoading(e) {
        let results = this.shadowRoot.querySelector('.results'); 
        if(!this.more) {
            while(results.firstChild){
                results.removeChild(results.firstChild);
            }
        } else {
            if (results.querySelector('.moreBtn')) {
                results.removeChild(this.loadMore);
            }
            if (results.querySelector('.invalidMsg')) {
                results.removeChild(this.invalidMsg);
            }
            this.more = false;
        }
        results.appendChild(this.loading);
    }

    _renderResults(e) {
        let results = this.shadowRoot.querySelector('.results'); 
        if (results.querySelector('.loading')) {
            results.removeChild(this.loading);
        }

        if (e.detail && typeof e.detail.results !== 'undefined' && typeof e.detail.invalid === 'undefined') {
            this.addResults(e.detail.results);
        } else {
            while(results.firstChild){
                results.removeChild(results.firstChild);
            }
            results.appendChild(this.invalidMsg);
        }
        let evt = { 
            detail: { results: this.results }, 
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('results-loaded', evt));
    }

    _clearResults(e) {
        this.results = undefined;
    }

    _checkValid(e) {
        let results = this.shadowRoot.querySelector('.results'); 
        let obj = e.detail;
        this.valid = Object.keys(obj.filters).length > 0 || (obj.term !== null && obj.term !== '' && typeof obj.term !== 'undefined');
        if(!this.valid) {
            results.appendChild(this.invalidMsg);
        } else {
            if (results.querySelector('.invalidMsg')) {
                results.removeChild(this.invalidMsg);
            }
        }
    }

    addResults(results) {
        let resultlist = this.shadowRoot.querySelector('.results'); 
        if (results && results.hits && results.hits.hits) {
            let hits = results.hits.hits;
            let l = hits.length;
            for( let i = 0; i < l; i++ ) {
                this.addResult(hits[i]);
            }
            this.last = this.last + l;
            if (this.last >= results.hits.total) {
                resultlist.appendChild(this.endOfResults);
            }
            if (l > 0 && this.last < results.hits.total) {
                if (resultlist.querySelector('.end-of-results')) { 
                    resultlist.removeChild(this.endOfResults);
                }
                resultlist.appendChild(this.loadMore);
            } else {
                if (resultlist.querySelector('.moreBtn')) { 
                    resultlist.removeChild(this.loadMore);
                }
                resultlist.appendChild(this.endOfResults);
            }
        }
    }
}

customElements.define('rhdp-search-results', RHDPSearchResults);