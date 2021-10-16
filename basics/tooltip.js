class Tooltip extends HTMLElement {
    constructor() {
        super()        
        this._tooltipText = 'Some dummy tooltip text.'
        this._tooltipIcon
        this._tooltipVisible = false
        this.attachShadow({ mode: 'open' })
        // const template = document.querySelector('#tooltip-template')
        // this.shadowRoot.appendChild(template.content.cloneNode(true))

        this.shadowRoot.innerHTML = `
            <style>

                :host {
                    position: relative;
                }
                
                :host(.important) {
                    background: var(--color-primary, #ccc);
                }

                :host-context(p) {
                    font-weight: bold;
                }

                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    top: 1.5rem;
                    left: 0.75rem;
                    z-index: 10;
                    padding: 0.15rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px (0,0,0,0.26);
                    font-weight: normal;
                    font-size: 14px;
                }

                .highlight {
                    background-color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }

                .help-icon {
                    background: black;
                    color: white;
                    padding: 0.15rem 0.5rem;
                    text-align: center;
                    border-radius: 50%;
                }
            </style>
            <slot>Some default</slot>
            <span class="help-icon">?</span>
        `
    }

    connectedCallback() {

        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text')
        }

        this._tooltipIcon = this.shadowRoot.querySelector('span')
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip)
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip)        
        this._render()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return
        }
        if (name === 'text') {
            this._tooltipText = newValue
        }
    }

    static get observedAttributes() {
        return ['text']
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div')
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div')
            tooltipContainer.textContent = this._tooltipText
            this.shadowRoot.appendChild(tooltipContainer)
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer)
            }
        }
    }

    _showTooltip = () => {
        this._tooltipVisible = true
        this._render()
    }

    _hideTooltip = () => {
        this._tooltipVisible = false
        this._render()
    }

    
}

customElements.define('uc-tooltip', Tooltip)