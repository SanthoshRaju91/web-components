'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-166b9795.js');

/*
 Stencil Client Patch Esm v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["uc-spinner_3.cjs",[[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"stockPrice":[32],"stockSymbolInput":[32],"stockSymbolInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","ucSymbolSelected"]]],[1,"uc-stock-finder",{"searchResults":[32]}],[1,"uc-spinner"]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
