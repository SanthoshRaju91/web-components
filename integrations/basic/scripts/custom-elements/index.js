import { attachShadow, h, createEvent, Host, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath } from '@stencil/core/internal/client';

const spinnerCss = ".lds-roller{display:block;position:relative;width:50px;height:50px}.lds-roller div{animation:lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;transform-origin:40px 40px}.lds-roller div:after{content:' ';display:block;position:absolute;width:7px;height:7px;border-radius:50%;background:#3b013b;margin:-4px 0 0 -4px}.lds-roller div:nth-child(1){animation-delay:-0.036s}.lds-roller div:nth-child(1):after{top:63px;left:63px}.lds-roller div:nth-child(2){animation-delay:-0.072s}.lds-roller div:nth-child(2):after{top:68px;left:56px}.lds-roller div:nth-child(3){animation-delay:-0.108s}.lds-roller div:nth-child(3):after{top:71px;left:48px}.lds-roller div:nth-child(4){animation-delay:-0.144s}.lds-roller div:nth-child(4):after{top:72px;left:40px}.lds-roller div:nth-child(5){animation-delay:-0.18s}.lds-roller div:nth-child(5):after{top:71px;left:32px}.lds-roller div:nth-child(6){animation-delay:-0.216s}.lds-roller div:nth-child(6):after{top:68px;left:24px}.lds-roller div:nth-child(7){animation-delay:-0.252s}.lds-roller div:nth-child(7):after{top:63px;left:17px}.lds-roller div:nth-child(8){animation-delay:-0.288s}.lds-roller div:nth-child(8):after{top:56px;left:12px}@keyframes lds-roller{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const Spinner = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
  }
  render() {
    return (h("div", { class: "lds-roller" }, h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null), h("div", null)));
  }
  static get style() { return spinnerCss; }
};

const API_KEY = "8MGCCW5T30ESYJ96";

const stockFinderCss = ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white;cursor:pointer}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:#3b013b;color:white}";

const StockFinder = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.ucSymbolSelected = createEvent(this, "ucSymbolSelected", 7);
    this.searchResults = [];
  }
  onFindStock(event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    this.findStock(stockName);
  }
  findStock(stockName) {
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(parsedResponse => {
      this.searchResults = parsedResponse['bestMatches'].map(match => {
        return {
          name: match['2. name'],
          symbol: match['1. symbol'],
        };
      });
    })
      .catch(err => {
      console.log(err);
    });
  }
  onSelectSymbol(symbol) {
    this.ucSymbolSelected.emit(symbol);
  }
  render() {
    return [
      h("form", { onSubmit: this.onFindStock.bind(this) }, h("input", { ref: el => (this.stockNameInput = el) }), h("button", { type: "submit" }, "Find!")),
      h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name)))),
    ];
  }
  static get style() { return stockFinderCss; }
};

const stockPriceCss = ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white;cursor:pointer}form button:active,form button:hover,form button:focus{background:#750175;border-color:#750175;outline:none}form button:disabled{background:#ccc;border-color:#ccc;color:white}";

const StockPrice = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    attachShadow(this);
    this.stockSymbolInputValid = false;
    this.loading = false;
  }
  onStockSymbolChange(newValue, oldValue) {
    if (newValue !== oldValue) {
      this.stockSymbolInput = newValue;
      this.stockSymbolInputValid = true;
      this.fetchStockPrice(newValue);
    }
  }
  ucSymbolSelected(event) {
    const stockName = event.detail;
    this.stockSymbol = stockName;
  }
  hostData() {
    return {
      class: this.error ? 'error' : ''
    };
  }
  onFetchStockPrice(event) {
    event.preventDefault();
    this.stockSymbol = this.stockSybmolRef.value;
  }
  componentDidLoad() {
    if (this.stockSymbol) {
      this.stockSymbolInput = this.stockSymbol;
      this.stockSymbolInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }
  fetchStockPrice(stockSymbol) {
    this.loading = true;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`)
      .then(res => {
      if (res.status !== 200) {
        throw new Error('Error fetching stock price');
      }
      return res.json();
    })
      .then(parsedResponse => {
      if (parsedResponse['Note']) {
        throw new Error(parsedResponse['Note']);
      }
      if (!parsedResponse['Global Quote']['05. price']) {
        throw new Error('Invalid stock symbol');
      }
      this.error = null;
      this.stockPrice = +parsedResponse['Global Quote']['05. price'];
      this.loading = false;
    })
      .catch(err => {
      this.stockPrice = 0;
      this.error = err.message;
      this.loading = false;
    });
  }
  onUserInput(event) {
    this.stockSymbolInput = event.target.value;
    if (this.stockSymbolInput.trim() !== '') {
      this.stockSymbolInputValid = true;
    }
    else {
      this.stockSymbolInputValid = false;
    }
  }
  __stencil_render() {
    let dataContent = h("p", null, "Enter a stock symbol");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.stockPrice) {
      dataContent = h("p", null, "Price: $", this.stockPrice);
    }
    if (this.loading) {
      dataContent = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockSybmolRef = el, value: this.stockSymbolInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockSymbolInputValid }, "Fetch")),
      h("div", null, dataContent)
    ];
  }
  get el() { return this; }
  static get watchers() { return {
    "stockSymbol": ["onStockSymbolChange"]
  }; }
  static get style() { return stockPriceCss; }
  render() { return h(Host, this.hostData(), this.__stencil_render()); }
};

const UcSpinner = /*@__PURE__*/proxyCustomElement(Spinner, [1,"uc-spinner"]);
const UcStockFinder = /*@__PURE__*/proxyCustomElement(StockFinder, [1,"uc-stock-finder",{"searchResults":[32]}]);
const UcStockPrice = /*@__PURE__*/proxyCustomElement(StockPrice, [1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"stockPrice":[32],"stockSymbolInput":[32],"stockSymbolInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","ucSymbolSelected"]]]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      UcSpinner,
  UcStockFinder,
  UcStockPrice
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { UcSpinner, UcStockFinder, UcStockPrice, defineCustomElements };
