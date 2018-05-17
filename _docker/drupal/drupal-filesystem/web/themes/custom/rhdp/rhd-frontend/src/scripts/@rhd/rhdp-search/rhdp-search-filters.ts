import RHElement from '@rhelements/rhelement';
import RHDPSearchFilterGroup from './rhdp-search-filter-group';
import RHDPSearchFilterItem from './rhdp-search-filter-item';

export default class RHDPSearchFilters extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
        <style>
            :host { 
                grid-area: filters;
            }
            .title {
                background: #e6e7e8; 
                color: #000;
                text-transform: uppercase;
                padding: .5em 1em;
                font-weight: 600;
            }
            
            .cancel { display: none; }
            .showBtn { 
                display: none;
                background: #ccc;
                text-decoration: none;
                border: 0;
                height: 40px;
                font-weight: 600;
                font-size: 16px;
                padding: 9px 40px;
                transition: background .2s ease-in 0s;
                line-height: 1.2em;
                cursor: pointer;
                position: relative;
                text-align: center;
                color: #333; 
                width: 100%;
                }
            .groups {
                background-color: #f9f9f9;
                padding-bottom: 30px;
                padding-top: 1.2em;
            }

            @media only screen and (max-width: 768px) {
                :host {
                    flex: none; 
                    justify-self: center; 
                    float: left;
                    border: none;
                    margin: 0; 
                }

                .control {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    padding-top: 51px;
                    background: rgba(0,0,0,.5);
                    border: none;
                    z-index: 99;
                    right: 100%;
                    position: absolute;
                    top: 100px;
                }
                .title { flex: 0 0 40px; order: 1; vertical-align: middle; }
                .showBtn {
                    display: block;
                    width: 150px;
                    height: auto;
                    border: 1px solid var(--rhd-blue);
                    line-height: 1.44;
                    background-color: transparent;
                    padding: 8px 0;
                    color: var(--rhd-blue);
                }

                .showBtn:hover, .showBtn:focus {
                        background-color: var(--rhd-blue);
                        color: var(--rhd-white);
                }
            }

        </style>
        <a class="showBtn">Show Filters</a>
        <div class="control" id="control">
            <div class="title">${el.title}</div>
            <div class="groups">
            </div>
        </div>`;
        return tpl;
    }

    _type = '';
    _title = 'Filter By';
    _filters;
    _toggle = false;
    _modal;

    get type() {
        return this._type;
    }

    set type(val) {
        if (this._type === val) return;
        this._type = val;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }

    get filters() {
        return this._filters;
    }

    set filters(val) {
        if (this._filters === val) return;
        this._filters = val;
    }

    get toggle() {
        return this._toggle;
    }

    set toggle(val) {
        if (this._toggle === val) return;
        this._toggle = val;
        if(this._toggle) {
            this.shadowRoot.querySelector('.cover').className = 'cover modal';
            window.scrollTo(0,0);
            document.body.style.overflow = 'hidden';
            this.style.height = window.innerHeight + 'px';
        } else {
            this.shadowRoot.querySelector('.cover').className = 'cover';
            document.body.style.overflow = 'auto';
        }
    }

    constructor() {
        super('rhdp-search-filters');
        this._clearFilters = this._clearFilters.bind(this);
        this._addFilters = this._addFilters.bind(this);
        this._checkActive = this._checkActive.bind(this);
    }
    
    connectedCallback() {
        super.render(this.template(this));
        // this.setAttribute('data-rhd-col','span3');
        // this.setAttribute('data-rhd-row', 'span5');
        this.addGroups();
        
        this.shadowRoot.addEventListener('click', e => {
            let evt = { bubbles: true, composed: true };
            switch (e.target['className']) {
                case 'showBtn':
                case 'cancel':
                case 'applyFilters':
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('toggle-modal', evt));
                    break;
                case 'clearFilters':
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('clear-filters', evt));
                    break;
                case 'more':
                    e.preventDefault();
                    break;
            }
        });
        
    }

    static get observedAttributes() { 
        return ['type', 'title', 'toggle']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    addGroups() {
        let groups = this.filters.facets,
            len = groups.length;
        for(let i=0; i < len; i++) {
            let group = new RHDPSearchFilterGroup(),
                groupInfo = groups[i],
                gLen = groupInfo.items.length;
                for(let j=0; j < gLen; j++) {
                    let item = new RHDPSearchFilterItem();
                    item.name = groupInfo.items[j].name;
                    item.value = groupInfo.items[j].value;
                    item.active = groupInfo.items[j].active;
                    item.key = groupInfo.items[j].key;
                    item.group = groupInfo.key;
                    group.items.push(item);
                }
            group.key = groupInfo.key;
            group.name = groupInfo.name;        
            this.shadowRoot.querySelector('.groups').appendChild(group);
        }
    }

    _checkActive(e) {
        if (e.detail) {
            if (e.detail.facet) {
                this.style.display = e.detail.facet.active ? 'block' : this.style.display;
            } else {
                let chk = this.shadowRoot.querySelectorAll('rhdp-search-filter-item[active]');
                if (chk.length > 0) {
                    this.style.display = 'block';
                } else {
                    this.style.display = 'none';
                }
            }
        }
    }

    _initActive(e, group_key, item) {
        if (e.detail && e.detail.filters) {
            //console.log(e.detail.filters);
            Object.keys(e.detail.filters).forEach(group => {
                e.detail.filters[group].forEach(facet => {
                    if (group === group_key) {
                        if (facet === item.key) {
                            return true;
                        }
                    }
                });
            });
            
        }
        return false;
    }

    _addFilters() {
        var groups = this.filters.facets;
        for(let i=0; i < groups.length; i++) {
            var items = groups[i].items;
            for(let j=0; j < items.length; j++) {
                let item = new RHDPSearchFilterItem();
                    item.name = items[j].name;
                    item.value = items[j].value;
                    item.bubble = false;
                    item.key = items[j].key;
                    item.group = groups[i].key;
                    this.shadowRoot.querySelector('.activeFilters').appendChild(item)
                }
            }
        // if (this.type === 'active') {
        //     this._checkActive();
        // }
    }

    applyFilters() {
        let evt = {
            bubbles: true,
            composed: true
        }
        this.dispatchEvent(new CustomEvent('apply-filters', evt));
    }

    _clearFilters(e) {
        this.style.display = 'none';
    }
}

customElements.define('rhdp-search-filters', RHDPSearchFilters);