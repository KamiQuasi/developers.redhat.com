import RHElement from '@rhelements/rhelement';

export default class DPCategoryItem extends RHElement {
    _template = document.createElement("template");
    
    get template() {
        return this._template;
    }
    set template(data: any) {
       this._template.innerHTML = `
       <style></style>
       <slot></slot>
       `;
    }

    constructor() {
        super('dp-category-item');
        
    }

    connectedCallback() {
        this.template = '';
        super.render();
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}

window.customElements.define('dp-category-item', DPCategoryItem);