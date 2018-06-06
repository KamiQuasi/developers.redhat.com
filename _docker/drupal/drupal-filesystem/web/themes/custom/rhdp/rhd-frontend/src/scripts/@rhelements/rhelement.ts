declare const ShadyCSS:any;

export default class RHElement extends HTMLElement {
    id:string;
    _template:HTMLTemplateElement;

    constructor(id, template?) {
        super();
        this.id = id;
        this._template = template || null;

        if (ShadyCSS && this._template) {
            ShadyCSS.prepareTemplate(this._template, id);
        }

        this.attachShadow({ mode: "open" });

        if (this._template) {
            this.shadowRoot.appendChild(this._template.content.cloneNode(true));
        }
    }

    connectedCallback() {
        if (ShadyCSS) {
            ShadyCSS.styleElement(this);
        }
    }

    static get observedAttributes() { 
        return ['url', 'name']; 
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }

    render() {
        if (this._template) {
            if (ShadyCSS) {
                ShadyCSS.prepareTemplate(this._template, this.id);
            }
        
            while (this.shadowRoot.firstChild) {
                this.shadowRoot.removeChild(this.shadowRoot.firstChild);
            }
        
            this.shadowRoot.appendChild(this._template.content.cloneNode(true));
        
            if (ShadyCSS) {
                ShadyCSS.styleElement(this);
            }
        }
    }
}