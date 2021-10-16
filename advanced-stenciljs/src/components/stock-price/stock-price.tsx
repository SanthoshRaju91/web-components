import { Component, h, State, Element, Prop, Watch, Listen } from '@stencil/core'

import { API_KEY } from '../../global/global'

@Component({
    tag: 'uc-stock-price',
    styleUrl: 'stock-price.css',
    shadow: true
})
export class StockPrice {

    stockSybmolRef: HTMLInputElement;

    @Element() el: HTMLElement

    @State() stockPrice: number;
    @State() stockSymbolInput: string;
    @State() stockSymbolInputValid: boolean = false;
    @State() error: string
    @State() loading = false;

    @Prop({ reflect: true, mutable: true }) stockSymbol: string;

    @Watch('stockSymbol')
    onStockSymbolChange(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.stockSymbolInput = newValue;
            this.stockSymbolInputValid = true
            this.fetchStockPrice(newValue)
        }
    }

    @Listen('ucSymbolSelected', { target: 'body' })
    ucSymbolSelected(event) {
        const stockName = event.detail;
        this.stockSymbol = stockName
    }

    hostData() {
        return {
            class: this.error ? 'error': ''
        }
    }

    onFetchStockPrice(event: Event) {
        event.preventDefault()
        this.stockSymbol = this.stockSybmolRef.value        
    }

    componentDidLoad() {
        if (this.stockSymbol) {
            this.stockSymbolInput = this.stockSymbol;
            this.stockSymbolInputValid = true
            this.fetchStockPrice(this.stockSymbol)
        }
    }

    fetchStockPrice(stockSymbol: string) {
        this.loading = true;
        fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${API_KEY}`
        )
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Error fetching stock price')
                }
                return res.json()
            })
            .then(parsedResponse => {

                if (parsedResponse['Note']) {
                    throw new Error(parsedResponse['Note'])
                }

                if (!parsedResponse['Global Quote']['05. price']) {
                    throw new Error('Invalid stock symbol')
                }
                this.error = null
                this.stockPrice = +parsedResponse['Global Quote']['05. price']
                this.loading = false;
            })
            .catch(err => {
                this.stockPrice = 0
                this.error = err.message;
                this.loading = false;
            })
    }

    onUserInput(event: Event) {
        this.stockSymbolInput = (event.target as HTMLInputElement).value
        if (this.stockSymbolInput.trim() !== '') {
            this.stockSymbolInputValid = true;
        } else {
            this.stockSymbolInputValid = false;
        }

    }

    render() {
        let dataContent = <p>Enter a stock symbol</p>

        if (this.error) {
            dataContent = <p>{this.error}</p>
        }

        if (this.stockPrice) {
            dataContent = <p>Price: ${this.stockPrice}</p>
        }

        if (this.loading) {
            dataContent = <uc-spinner />
        }

        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input 
                    id="stock-symbol" 
                    ref={el => this.stockSybmolRef = el} 
                    value={this.stockSymbolInput}
                    onInput={this.onUserInput.bind(this)}
                />
                <button type="submit" disabled={!this.stockSymbolInputValid}>Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
            
        ]
    }
}