export declare class StockPrice {
  stockSybmolRef: HTMLInputElement;
  el: HTMLElement;
  stockPrice: number;
  stockSymbolInput: string;
  stockSymbolInputValid: boolean;
  error: string;
  loading: boolean;
  stockSymbol: string;
  onStockSymbolChange(newValue: any, oldValue: any): void;
  ucSymbolSelected(event: any): void;
  hostData(): {
    class: string;
  };
  onFetchStockPrice(event: Event): void;
  componentDidLoad(): void;
  fetchStockPrice(stockSymbol: string): void;
  onUserInput(event: Event): void;
  render(): any[];
}
