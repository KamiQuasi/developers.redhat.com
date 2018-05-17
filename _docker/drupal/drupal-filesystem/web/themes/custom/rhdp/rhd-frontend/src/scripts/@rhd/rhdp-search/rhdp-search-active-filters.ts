import RHElement from '@rhelements/rhelement';
import RHDPSearchFilterGroup from './rhdp-search-filter-group';
import RHDPSearchFilterItemInline from './rhdp-search-filter-item-inline';

export default class RHDPSearchActiveFilters extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        tpl.innerHTML = `
        <style>
            :host {
                grid-area: activefilters;
                margin-bottom: 30px;
                display: flex;
                flex-direction: row;
                margin-bottom: 1em;
            }

            .clearFilters {
                font-size: 16px;
            }

            strong {
                flex: 0 1 auto; 
                order: 1; 
                font-weight: 600;
                font-size: 1.2em;
                margin: 0.3em .7em 0 0;
                white-space: nowrap;
            }

            .active-type div { flex: 1 1 auto; order: 2; list-style: none; }
            .active-type a {
                flex: 0 1 auto;
                order: 3;
                text-decoration: none;
                color: #0066CC;
                margin-top: .3em;
                font-weight: 100;
                font-size: 14px;
                white-space: nowrap;
                &:hover, &:active, &:focus { color: #004080; }
            }

            @media only screen and (max-width: 768px) {
                :host {
                    margin-bottom: 15px; 
                    list-style: none;
                    width: auto;
                    white-space: nowrap;
                    overflow-y: hidden;
                }

                strong { display: none; }

                a {
                    display: inline;
                    clear: left;
                    font-size: 16px;
                    position: relative;
                    top: 5px;
                    vertical-align: top;
                }
            }

        </style>
        <div class="active-type">
            <strong>${el.title}</strong>
            <div class="activeFilters"></div>
            <a href="#" class="clearFilters">Clear Filters</a>
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
        super('rhdp-search-active-filters');
        this._toggleModal = this._toggleModal.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._addFilters = this._addFilters.bind(this);
        this._checkActive = this._checkActive.bind(this);
    }
    
    connectedCallback() {
        super.render(this.template(this));
        top.addEventListener('filter-item-change', this._checkActive);
        top.addEventListener('filter-item-init', this._checkActive);
        top.addEventListener('search-complete', this._checkActive);
        top.addEventListener('params-ready', this._checkActive);
        top.addEventListener('clear-filters', this._clearFilters);
        this._addFilters();

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
                    let item = new RHDPSearchFilterItemInline();
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
                let chk = this.shadowRoot.querySelectorAll('rhdp-search-filter-item-inline[active]');
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
                let item = new RHDPSearchFilterItemInline();
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

    _toggleModal(e) {
        if (this.type === 'modal') {
            this.toggle = !this.toggle;
        }
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

customElements.define('rhdp-search-active-filters', RHDPSearchActiveFilters);