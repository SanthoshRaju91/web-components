import { Component, h, State, Event } from '@stencil/core';
import { API_KEY } from '../../global/global';
export class StockFinder {
  constructor() {
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
      h("form", { onSubmit: this.onFindStock.bind(this) },
        h("input", { ref: el => (this.stockNameInput = el) }),
        h("button", { type: "submit" }, "Find!")),
      h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) },
        h("strong", null, result.symbol),
        " - ",
        result.name)))),
    ];
  }
  static get is() { return "uc-stock-finder"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["stock-finder.css"]
  }; }
  static get styleUrls() { return {
    "$": ["stock-finder.css"]
  }; }
  static get states() { return {
    "searchResults": {}
  }; }
  static get events() { return [{
      "method": "ucSymbolSelected",
      "name": "ucSymbolSelected",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      }
    }]; }
}
