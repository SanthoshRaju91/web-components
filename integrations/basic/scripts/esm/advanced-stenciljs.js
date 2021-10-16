import { p as promiseResolve, b as bootstrapLazy } from './index-922f78b9.js';

/*
 Stencil Client Patch Browser v2.3.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts =  {};
    if ( importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["uc-spinner_3",[[1,"uc-stock-price",{"stockSymbol":[1537,"stock-symbol"],"stockPrice":[32],"stockSymbolInput":[32],"stockSymbolInputValid":[32],"error":[32],"loading":[32]},[[16,"ucSymbolSelected","ucSymbolSelected"]]],[1,"uc-stock-finder",{"searchResults":[32]}],[1,"uc-spinner"]]]], options);
});
