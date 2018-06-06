import RHElement from '@rhelements/rhelement';

export default class DPCategoryItemList extends RHElement {
    _template = document.createElement("template");
    
    get template() {
        return this._template;
    }
    set template(data: any) {
       this._template.innerHTML = `
            <style>
            :host[visible] {
                display: block;
            }

            :host {
                display: none;
                flex: 1 1 100%;
                grid-column: span 1;
            }

            div {
                background: white;
                display: grid;
                grid-template-columns: 1fr;
                grid-gap: 15px;
                position: relative;
                padding-top: 15px;
                padding-right: 15px;
                padding-left: 15px;
            }

            @media (min-width: 500px) {
                :host {
                    grid-column: span 2;
                    margin-bottom: 30px;
                }

                div {
                    border: 1px solid #CCCCCC;
                }
            }

            @media (min-width: 800px) {
                :host {
                    grid-column: span 3;
                }

                div {
                    grid-template-columns: repeat(2, 1fr);
                }
            }

            @media (min-width: 1200px) {
                :host {
                    grid-column: span 4;
                }

                div {
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 30px;
                    background-color: #FFFFFF;
                    padding: 30px;
                    margin-bottom: 30px;
                }
            }
            </style>
            <div>
            <slot></slot>
            </div>
            `;
    }

    _index = 1;
    _visible = false;

    get index() {
        return this._index;
    }
    set index(val) {
        if (this._index === val) return;
        this._index = val;
        this.template = this;
        super.render();
    }

    get visible() {
        return this._visible;
    }
    set visible(val) {
        val = val !== null && val !== false ? true : false;
        if (this._visible === val) return;
        this._visible = val;

        if (this._visible) {
            this.style.display = 'block';
            this.setAttribute('visible','');
        } else {
            this.style.display = 'none';
            this.removeAttribute('visible');
        }
    }

    constructor() {
        super('dp-category-item-list');
        
    }

    connectedCallback() {
        this.template = this;
        super.render();
    }

    static get observedAttributes() { 
        return ['index', 'visible']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

window.customElements.define('dp-category-item-list', DPCategoryItemList);