'use strict';

const index = require('./index-166b9795.js');

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('advanced-stenciljs.cjs.js', document.baseURI).href));
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["uc-spinner_3.cjs",[[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"stockPrice":[32],"stockSymbolInput":[32],"stockSymbolInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","ucSymbolSelected"]]],[1,"uc-stock-finder",{"searchResults":[32]}],[1,"uc-spinner"]]]], options);
});
