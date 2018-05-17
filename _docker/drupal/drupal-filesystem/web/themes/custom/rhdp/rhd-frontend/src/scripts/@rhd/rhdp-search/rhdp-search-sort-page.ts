import RHElement from '@rhelements/rhelement';

export default class RHDPSearchSortPage extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
        <style>
        :host {
            grid-area: sort;
            display: block;
            padding: 0 0 1em 0;
            border-bottom: 1px solid var(--rhd-gray-4);
            margin-bottom: 30px;
        }
            
        select { 
            width: auto;
            padding-right: 20px;
            margin: 0 0 1rem 0;
            -webkit-border-radius: 0px;
            background-color: #FAFAFA;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeD0iMTJweCIgeT0iMHB4IiB3aWR0aD0iMjRweCIgaGVpZ2h0PSIzcHgiIHZpZXdCb3g9IjAgMCA2IDMiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDYgMyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHBvbHlnb24gcG9pbnRzPSI1Ljk5MiwwIDIuOTkyLDMgLTAuMDA4LDAgIi8+PC9zdmc+);
            background-position: 100% center;
            background-repeat: no-repeat;
            border: 1px solid #cccccc;
            padding: 0.5rem;
            font-size: 0.875rem;
            font-family: "overpass","Open Sans",Helvetica,sans-serif;
            color: rgba(0,0,0,0.75);
            line-height: normal;
            border-radius: 0;
            height: 2.3125rem;
            /* Hacks to style dropdown */
            -webkit-appearance: none !important;
            -moz-appearance: none;
        }
        
        .tight {
            display: none;
        }

        .tight .button {
            background: #ccc;
            text-decoration: none;
            border: 0;
            font-weight: 600;
            font-size: 16px;
            padding: 9px 25px;
            transition: background .2s ease-in 0s;
            line-height: 1.2em;
            cursor: pointer;
            position: relative;
            text-align: center;
            color: #333; 
            width: 100%;
            display: block;
            width: 150px;
            margin-right: 2em;
        }
    
        @media only screen and (max-width: 768px) {
            :host {
                border-bottom: none;
                justify-self: center;
            }
            span { display: none; }
            select { 
                width: 150px; 
                text-align: center;
                text-align-last: center;
                font-weight: 600;
                height: auto;
                border: 1px solid var(--rhd-blue);
                line-height: 1.44;
                background-color: transparent;
                padding: 8px 0;
                color: var(--rhd-blue);
                font-size: 16px;
                position: relative;
                margin: 0;
            }
    
            select:hover, select:focus {
                background-color: var(--rhd-blue);
                color: var(--rhd-white);
            }
        
            .roomy {
                display: none;
            }
            .tight { 
                display: block; 
            }
            .clear {
                padding: 0;
                margin: 0; 
                border: 1px solid white;
                width: auto;
                font-weight: bold;
            }
        }
        
        @media only screen and (max-width: 365px) {
            :host {
                position: relative;
                left: 0; top: 0;
                margin-left: 0px;
            }
        }
    </style>
    <span>Sort results by</span>
    <select>
        <option value="relevance">Relevance</option>
        <option value="most-recent">Most Recent</option>
    </select>`;
        return tpl;
    }
    _sort;

    get sort() {
        return this._sort;
    }
    set sort(val) {
        if (this._sort === val) return;
        this._sort = val;
        this.setAttribute('sort', this._sort);
        this.shadowRoot.querySelector('select').value = val;
    }
    constructor() {
        super('rhdp-search-sort-page');

        this._sortChange = this._sortChange.bind(this);
    }

    connectedCallback() {
        super.render(this.template(this));
        top.addEventListener('params-ready', this._sortChange);
        this.shadowRoot.querySelector('select').onchange = this._sortChange;
    }

    static get observedAttributes() { 
        return ['sort']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _sortChange(e) {
        if (e.detail && e.detail.sort) {
            this.sort = e.detail.sort;
        } else {
            if ( e.target['options'] && typeof e.target['selectedIndex'] !== 'undefined') {
                this.sort = e.target['options'][e.target['selectedIndex']].value;
                let evt = {
                    detail: { 
                        sort: this.sort 
                    }, 
                    bubbles: true,
                    composed: true
                };
                this.dispatchEvent(new CustomEvent('sort-change', evt));
            }
        }
    }
}

customElements.define('rhdp-search-sort-page', RHDPSearchSortPage);