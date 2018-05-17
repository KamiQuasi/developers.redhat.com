import RHElement from '@rhelements/rhelement';

export default class RHDPSearchFilterItem extends RHElement {
    template = el => {
        const tpl = document.createElement("template");
        let checked = el.active ? 'checked' : '';
        tpl.innerHTML = `
        <style>
        .list {
            display: flex;
            flex-direction: row;
            padding: .5em .5em 0 1.1em;
            clear: left;
            font-size: 14px;
            line-height: 1.25em;
            height: auto;
            cursor: pointer;
        }

        span { 
            display: none;
        }
        input {
            margin: .25em 5px 0 0;
            flex: 0 0 auto;
            order: 0;
        }
        label {
            margin-left: 0;
            display: inline-block;
            margin-right: 1rem;
            margin-bottom: 0;
            vertical-align: baseline;
            font-size: 0.875rem;
            color: #4d4d4d;
            cursor: pointer;
            font-weight: 400;
            line-height: 1.5;
        }
        </style>
        <div class="list"><span>${el.name}</span><input type="checkbox" ${checked} id="filter-item-${el.key}" value="${el.key}"><label for="filter-item-${el.key}">${el.name}</label></div>`;
        return tpl;
    }

    _key;
    _name;
    _active = false;
    _value;
    _bubble = true;
    _bounce = false;
    _group;

    get name() {
        return this._name;
    }
    set name(val) {
        if (this._name === val) return;
        this._name = val;
        this.setAttribute('name', this._name);
    }
    get key() {
        return this._key;
    }
    set key(val) {
        if (this._key === val) return;
        this._key = val;
        this.className = `filter-item-${this._key}`;
        this.setAttribute('key', this._key);
    }
    get group() {
        return this._group;
    }

    set group(val) {
        if (this._group === val) return;
        this._group = val;
        this.setAttribute('group', this._group);
    }

    get bubble() {
        return this._bubble;
    }

    set bubble(val) {
        if (this._bubble === val) return;
        this._bubble = val;
    }

    get bounce() {
        return this._bounce;
    }
    set bounce(val) {
        if (this._bounce === val) return;
        this._bounce = val;
    }


    get active() {
        return this._active;
    }
    set active(val) {
        if(typeof val === 'string') {
            val = true;
        } 
        if ( val === null ) {
            val = false;
        }
        if (this._active === val) {
            return;
        } else {
            this._active = val;
            let chkbox = this.shadowRoot.querySelector('input');
            if(this._active) { 
                this.setAttribute('active','');
            } else { 
                this.removeAttribute('active'); 
            }
            if (chkbox) {
                chkbox.checked = this._active;
            }
            let evt = {detail: {facet: this}, bubbles: this.bubble, composed: true };
            this.dispatchEvent(new CustomEvent('filter-item-change', evt));
            this.bubble = true;
        }
    }
    get value() {
        return this._value;
    }
    set value(val) {
        if (this._value === val) return;
        this._value = val;
        this.setAttribute('value', this.value);
    }

    constructor() {
        super('rhdp-search-filter-item');

        this._checkParams = this._checkParams.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
        this._checkChange = this._checkChange.bind(this);
        this._updateFacet = this._updateFacet.bind(this);
    }

    

    connectedCallback() {
        super.render(this.template(this));
        this.shadowRoot.addEventListener('change', this._updateFacet);
        
        top.addEventListener('filter-item-change', this._checkChange);
        top.addEventListener('params-ready', this._checkParams);
        top.addEventListener('clear-filters', this._clearFilters);
        //top.window.addEventListener('popstate', this._clearFilters);
    }

    static get observedAttributes() { 
        return ['name', 'active', 'value', 'key', 'group']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    _updateFacet(e) {
        this.bounce = true;
        this.active = !this.active;
    }

    _checkParams(e) {
        let chk = false;
        if (e.detail && e.detail.filters) {
            Object.keys(e.detail.filters).forEach(group => {
                e.detail.filters[group].forEach(facet => {
                    if (group === this.group) {
                        if (facet === this.key) {
                            chk = true;
                            this.bubble = false;
                            this.active = true;
                            let evt = {detail: {facet: this}, bubbles: this.bubble, composed: true };
                            this.dispatchEvent(new CustomEvent('filter-item-init', evt));
                        }
                    }
                });
            });
        }

        if (!chk) {
            this.bubble = false;
            this.active = false;
        }
    }

    _checkChange(e) {
        if (e.detail && e.detail.facet) {
            if (!this.bounce) {
                if(this.group === e.detail.facet.group && this.key === e.detail.facet.key) {
                    this.bubble = false;
                    this.active = e.detail.facet.active;
                }
            }
            this.bubble = true;
            this.bounce = false;
        }
    }
    
    _clearFilters(e) {
        this.bubble = false; 
        this.bounce = false;
        this.active = false;
    }
}

customElements.define('rhdp-search-filter-item', RHDPSearchFilterItem);