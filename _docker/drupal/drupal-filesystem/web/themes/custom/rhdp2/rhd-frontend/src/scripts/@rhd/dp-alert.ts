import PFElement from '@patternfly/pfelement/pfelement.umd';
// import {library, icon} from '@fortawesome/fontawesome-svg-core/index';
// import {faTimes} from '@fortawesome/pro-solid-svg-icons/index';

// library.add(faTimes);

export class DPAlert extends PFElement {
    get html() {
        return `
        <style>
        :host .pf-c-alert__icon {
            --alert-color--background: #73c5c5;
            --alert-color--text: #003737;
            background-color: var(--alert-color--background);
            color: var(--alert-color--text);
        }
        :host .pf-c-alert__title {
            --alert-color--text: #003737;
            color: var(--alert-color--text);
        }

        .pf-c-alert {
            display: grid;
            grid-template-areas: "icon title action" "icon content content";
            grid-template-columns: 53px auto 1fr;
            grid-template-rows: 56px 0;
            font-size: 16px;
            font-weight: 400;
            box-shadow: rgba(3, 3, 3, 0.13) 0px 3px 7px 3px, rgba(3, 3, 3, 0.12) 0px 11px 24px 16px;
            background-color: #fff;
            line-height: 24px;
            margin: 0;
            padding: 0;
            text-align: left;
            position: relative;
        }

        .pf-c-alert__title {
            background-color: #fff;
            color: #003737;
            font-size: 16px;
            font-weight: 700;
            grid-column-end: title;
            grid-column-start: title;
            grid-row-end: title;
            grid-row-start: title;
            line-height: 24px;
            margin: 0;
            padding: 16px;
        }

        .pf-screen-reader {
            position: fixed;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            border: 0;
        }

        .pf-c-alert__description {
            background-color: #fff;
            color: #151515;
            font-size: 16px;
            font-weight: 700;
            display: contents;
            grid-column-end: content;
            grid-column-start: content;
            grid-row-end: content;
            grid-row-start: content;
            line-height: 24px;
            margin-top: -8px;
            margin-right: 0;
            margin-bottom: 0;
            margin-left: 0;
            padding-top: 0;
            padding-right: 16px;
            padding-bottom: 16px;
            padding-left: 16px;
        }

        .pf-c-alert__action {
            background-color: #fff;
            color: #151515;
            font-size: 16px;
            font-weight: 400;
            grid-column-end: action;
            grid-column-start: action;
            grid-row-end: action;
            grid-row-start: action;
            line-height: 24px;
            margin-top: 0;
            margin-right: 0;
            margin-bottom: 0;
            margin-left: 0;
            padding-top: 11px;
            padding-right: 4px;
            padding-bottom: 0;
            padding-left: 0;
        }

        .pf-c-alert__icon {
            display: flex;
            font-size: 24px;
            font-weight: 400;
            grid-column-end: icon;
            grid-column-start: icon;
            grid-row-end: icon;
            grid-row-start: icon;
            line-height: 36px;
            margin: 0;
            padding: 16px;
            text-align: left;
        }

        .pf-c-alert__icon img {
            width: 20px;
        }

        :host([type="success"]) .pf-c-alert__icon {
            --alert-color--background: #92d400;
            --alert-color--text: #486b00;
            background-color: var(--alert-color--background);
            color: var(--alert-color--text);
        }:host([type="success"]) .pf-c-alert__title {
            --alert-color--text: #486b00;
            color: var(--alert-color--text);
        }

        :host([type="warning"]) .pf-c-alert__icon {
            --alert-color--background: #f0ab00;
            --alert-color--text: #795600;
            background-color: var(--alert-color--background);
            color: var(--alert-color--text);
        }
        :host([type="warning"]) .pf-c-alert__title {
            --alert-color--text: #795600;
            color: var(--alert-color--text);
        }

        :host([type="danger"]) .pf-c-alert__icon {
            --alert-color--background: #c9190b;
            --alert-color--text: #470000;
            background-color: var(--alert-color--background);
            color: var(--alert-color--text);
        }
        :host([type="danger"]) .pf-c-alert__title {
            --alert-color--text: #470000;
            color: var(--alert-color--text);
        }

        :host([type="info"]) .pf-c-alert__icon {
            --alert-color--background: #73bcf7;
            --alert-color--text: #004368;
            background-color: var(--alert-color--background);
            color: var(--alert-color--text);
        }
        :host([type="info"]) .pf-c-alert__title {
            --alert-color--text: #004368;
            color: var(--alert-color--text);
        }

        :host([size="xl"]) .pf-c-alert {
            grid-template-columns: 53px auto 47px;
            grid-template-rows: 56px auto;
        }

        :host([size="xl"]) .pf-c-alert__icon {
            display: flex;
            align-items: flex-start;
        }
        :host([size="xl"]) .pf-c-alert__icon img {
            width: 20px;
        }

        :host([size="xl"]) .close {
            grid-column: 3;
            grid-row: 1;
        }

        :host([size="xl"]) .pf-c-alert__description p {
            padding-top: 0;
            padding-right: 16px;
            padding-bottom: 16px;
            padding-left: 16px;
            margin-top: 0;
            margin-bottom: 0;
        }

        a.close {
            margin-left: 5px;
            background-repeat: no-repeat;
            height: 24px;
            color: #3b6e90;
        }

        </style>
        <div class="pf-c-alert ${this.inline ? 'pf-m-inline':''}" aria=label="alert">
        <div class="pf-c-alert__icon">
            <i class="${this.icon}" aria-hidden="true"></i>
        </div>
        ${this.title ? `<h4 class="pf-c-alert__title">
            <span class="pf-screen-reader">${this.type.replace(this.type.match(/[a-z]/)[0],this.type.match(/[a-z]/)[0].toUpperCase())}</span>
            ${this.title}
        </h4>` : ''}
        <div class="pf-c-alert__description"><slot>${this.text}</slot></div>
        <div class="pf-c-alert__action"><slot name="dp-alert__description"></slot></div>
        </div>`;
    }

    static get tag() { return 'dp-alert'; }

    _type = 'info';
    _inline : string;
    _title : string;
    _icon = 'fas fa-bell';
    _background = '#dcedf8';
    _border = '#87aac1';
    _text : string;

    get type() {
        return this._type;
    }
    set type(val) {
        if (this._type === val) return;
        this._type = val;
        switch(this._type) {
            case 'success':
                this.icon = 'fas fa-check-circle';
                break;
            case 'warning':
                this.icon = 'fas fa-exclamation-triangle';
                break;
            case 'danger':
                this.icon = 'fas fa-exclamation-circle';
                break;
            case 'info':
                this.icon = 'fas fa-info-circle';
            default:
                this.icon = 'fas fa-bell';
                break;
        }
        this.setAttribute('type', this._type);
    }

    get inline() {
        return this._inline;
    }
    set inline(val) {
        if (this._inline === val) return;
        this._inline = val;
        this.setAttribute('inline', this._inline)
    }

    get title() {
        return this._title;
    }
    set title(val) {
        if (this._title === val) return;
        this._title = val;
    }

    get text() {
        return this._text;
    }
    set text(val) {
        if (this._text === val) return;
        this._text = val;
    }

    get icon() {
        return this._icon;
    }
    set icon(val) {
        if (this._icon === val) return;
        this._icon = val;
    }

    constructor() {
        super(DPAlert, {delayRender: true });
    }

    connectedCallback() {
        super.connectedCallback();

        if (top['FontAwesome']) {
            top['FontAwesome'].dom.i2svg({node: this.shadowRoot});
        }

        let closer = this.shadowRoot.querySelector('.close');
        if (closer) {
            this.addEventListener('click', e => {
                e.preventDefault();
                if(e.composedPath()[0]['className'] === 'close') {
                    this.remove();
                }
                // console.log(e.composedPath());
            });
        }

        super.render();
    }

    static get observedAttributes() {
        return ['type', 'inline', 'title'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        super.render();
    }

    acknowledge() {
        this.remove();
    }
}

PFElement.create(DPAlert);
