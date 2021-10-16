import{r as t,h as r,c as o,g as i,H as l}from"./p-130ce171.js";const e=class{constructor(r){t(this,r)}render(){return r("div",{class:"lds-roller"},r("div",null),r("div",null),r("div",null),r("div",null),r("div",null),r("div",null),r("div",null),r("div",null))}};e.style=".lds-roller{display:block;position:relative;width:50px;height:50px}.lds-roller div{animation:lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;transform-origin:40px 40px}.lds-roller div:after{content:' ';display:block;position:absolute;width:7px;height:7px;border-radius:50%;background:#3b013b;margin:-4px 0 0 -4px}.lds-roller div:nth-child(1){animation-delay:-0.036s}.lds-roller div:nth-child(1):after{top:63px;left:63px}.lds-roller div:nth-child(2){animation-delay:-0.072s}.lds-roller div:nth-child(2):after{top:68px;left:56px}.lds-roller div:nth-child(3){animation-delay:-0.108s}.lds-roller div:nth-child(3):after{top:71px;left:48px}.lds-roller div:nth-child(4){animation-delay:-0.144s}.lds-roller div:nth-child(4):after{top:72px;left:40px}.lds-roller div:nth-child(5){animation-delay:-0.18s}.lds-roller div:nth-child(5):after{top:71px;left:32px}.lds-roller div:nth-child(6){animation-delay:-0.216s}.lds-roller div:nth-child(6):after{top:68px;left:24px}.lds-roller div:nth-child(7){animation-delay:-0.252s}.lds-roller div:nth-child(7):after{top:63px;left:17px}.lds-roller div:nth-child(8){animation-delay:-0.288s}.lds-roller div:nth-child(8):after{top:56px;left:12px}@keyframes lds-roller{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";const n=class{constructor(r){t(this,r),this.ucSymbolSelected=o(this,"ucSymbolSelected",7),this.searchResults=[]}onFindStock(t){t.preventDefault(),this.findStock(this.stockNameInput.value)}findStock(t){fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${t}&apikey=8MGCCW5T30ESYJ96`).then((t=>t.json())).then((t=>{this.searchResults=t.bestMatches.map((t=>({name:t["2. name"],symbol:t["1. symbol"]})))})).catch((t=>{console.log(t)}))}onSelectSymbol(t){this.ucSymbolSelected.emit(t)}render(){return[r("form",{onSubmit:this.onFindStock.bind(this)},r("input",{ref:t=>this.stockNameInput=t}),r("button",{type:"submit"},"Find!")),r("ul",null,this.searchResults.map((t=>r("li",{onClick:this.onSelectSymbol.bind(this,t.symbol)},r("strong",null,t.symbol)," - ",t.name))))]}};n.style=":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus,form button:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white;cursor:pointer}form button:hover,form button:active{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:white;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:0.25rem 0;padding:0.25rem;border:1px solid #ccc;cursor:pointer}li:hover,li:active{background:#3b013b;color:white}";const s=class{constructor(r){t(this,r),this.stockSymbolInputValid=!1,this.loading=!1}onStockSymbolChange(t,r){t!==r&&(this.stockSymbolInput=t,this.stockSymbolInputValid=!0,this.fetchStockPrice(t))}ucSymbolSelected(t){this.stockSymbol=t.detail}hostData(){return{class:this.error?"error":""}}onFetchStockPrice(t){t.preventDefault(),this.stockSymbol=this.stockSybmolRef.value}componentDidLoad(){this.stockSymbol&&(this.stockSymbolInput=this.stockSymbol,this.stockSymbolInputValid=!0,this.fetchStockPrice(this.stockSymbol))}fetchStockPrice(t){this.loading=!0,fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${t}&apikey=8MGCCW5T30ESYJ96`).then((t=>{if(200!==t.status)throw new Error("Error fetching stock price");return t.json()})).then((t=>{if(t.Note)throw new Error(t.Note);if(!t["Global Quote"]["05. price"])throw new Error("Invalid stock symbol");this.error=null,this.stockPrice=+t["Global Quote"]["05. price"],this.loading=!1})).catch((t=>{this.stockPrice=0,this.error=t.message,this.loading=!1}))}onUserInput(t){this.stockSymbolInput=t.target.value,this.stockSymbolInputValid=""!==this.stockSymbolInput.trim()}__stencil_render(){let t=r("p",null,"Enter a stock symbol");return this.error&&(t=r("p",null,this.error)),this.stockPrice&&(t=r("p",null,"Price: $",this.stockPrice)),this.loading&&(t=r("uc-spinner",null)),[r("form",{onSubmit:this.onFetchStockPrice.bind(this)},r("input",{id:"stock-symbol",ref:t=>this.stockSybmolRef=t,value:this.stockSymbolInput,onInput:this.onUserInput.bind(this)}),r("button",{type:"submit",disabled:!this.stockSymbolInputValid},"Fetch")),r("div",null,t)]}get el(){return i(this)}static get watchers(){return{stockSymbol:["onStockSymbolChange"]}}render(){return r(l,this.hostData(),this.__stencil_render())}};s.style=":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:red}form input{font:inherit;color:#3b013b;padding:0.1rem 0.25rem;display:block;margin-bottom:0.5rem}form input:focus{outline:none}form button{font:inherit;padding:0.25rem 0.5rem;border:1px solid #3b013b;background:#3b013b;color:white;cursor:pointer}form button:active,form button:hover,form button:focus{background:#750175;border-color:#750175;outline:none}form button:disabled{background:#ccc;border-color:#ccc;color:white}";export{e as uc_spinner,n as uc_stock_finder,s as uc_stock_price}