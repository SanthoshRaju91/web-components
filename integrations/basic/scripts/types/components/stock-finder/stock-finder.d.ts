import { EventEmitter } from '../../stencil-public-runtime';
export declare class StockFinder {
  stockNameInput: HTMLInputElement;
  searchResults: {
    symbol: string;
    name: string;
  }[];
  ucSymbolSelected: EventEmitter<string>;
  onFindStock(event: Event): void;
  findStock(stockName: string): void;
  onSelectSymbol(symbol: string): void;
  render(): any[];
}
