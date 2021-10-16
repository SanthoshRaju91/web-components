class ToogleText extends HTMLElement {
    constructor() {
        super()
        this._isShown = false
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
            <div>
                <button>Show</button>
                <p id="info">
                    <slot></slot>
                </p>
            </div>
        `
    }

    connectedCallback() {
        const toogleButton = this.shadowRoot.querySelector('button')
        toogleButton.addEventListener('click', this._toogleHandler)

        if (this.hasAttribute('show')) {
            this._isShown = true 
        }
        this._toogleInfo(this._isShown)
        this._setToogleButtonText(this._isShown)
    }

    _setToogleButtonText = (shown) => {
        const toogleButton = this.shadowRoot.querySelector('button')
        toogleButton.textContent = shown ? 'Hide' : 'Show'
    }

    _toogleHandler = () => {
        this._isShown = !this._isShown
        this._toogleInfo(this._isShown)
        this._setToogleButtonText(this._isShown)
    }

    _toogleInfo = (shown) => {
        const infoContainer = this.shadowRoot.querySelector('#info')
        infoContainer.style.display = shown ? 'block': 'none'
    }
}

customElements.define('uc-toogle-text', ToogleText)