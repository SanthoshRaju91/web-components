import { Component, h, State, Element, Prop, Watch, Listen } from '@stencil/core';
import { API_KEY } from '../../global/global';
export class StockPrice {
  constructor() {
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
  render() {
    let dataContent = h("p", null, "Enter a stock symbol");
    if (this.error) {
      dataContent = h("p", null, this.error);
    }
    if (this.stockPrice) {
      dataContent = h("p", null,
        "Price: $",
        this.stockPrice);
    }
    if (this.loading) {
      dataContent = h("uc-spinner", null);
    }
    return [
      h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
        h("input", { id: "stock-symbol", ref: el => this.stockSybmolRef = el, value: this.stockSymbolInput, onInput: this.onUserInput.bind(this) }),
        h("button", { type: "submit", disabled: !this.stockSymbolInputValid }, "Fetch")),
      h("div", null, dataContent)
    ];
  }
  static get is() { return "uc-stock-price"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-price.css"]
  }; }
  static get properties() { return {
    "stockSymbol": {
      "type": "string",
      "mutable": true,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "stock-symbol",
      "reflect": true
    }
  }; }
  static get states() { return {
    "stockPrice": {},
    "stockSymbolInput": {},
    "stockSymbolInputValid": {},
    "error": {},
    "loading": {}
  }; }
  static get elementRef() { return "el"; }
  static get watchers() { return [{
      "propName": "stockSymbol",
      "methodName": "onStockSymbolChange"
    }]; }
  static get listeners() { return [{
      "name": "ucSymbolSelected",
      "method": "ucSymbolSelected",
      "target": "body",
      "capture": false,
      "passive": false
    }]; }
}
