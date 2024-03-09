import { Component, OnInit } from '@angular/core';
import { Observable, filter, from, map, toArray } from 'rxjs';

interface RawStock {
  symbol: string;
  price: number;
  percentChange: number;
  name: string;
  category: string;
}

interface Stock extends Omit<RawStock, 'name' | 'category'> { }

@Component({
  selector: 'app-root',
  template: `
  <ng-container *ngIf="stocks$ | async as stocks">
    <div *ngFor="let stock of stocks">
      <p>{{ stock.symbol }} - {{ stock.price }} - {{ stock.percentChange }}</p>
    </div>
  </ng-container>
`
})
export class AppComponent implements OnInit {
  stocks: RawStock[] = [ // Just for simplicity, realistically will be fetched from an api or via WebSocket of some kind
    { symbol: 'AAPL', price: 150.25, percentChange: 1.5, name: 'Apple Inc.', category: 'Technology' },
    { symbol: 'GOOGL', price: 2800.75, percentChange: 7, name: 'Alphabet Inc.', category: 'Technology' },
    { symbol: 'MSFT', price: 300.45, percentChange: 2.3, name: 'Microsoft Corporation', category: 'Technology' },
    { symbol: 'AMZN', price: 3500.50, percentChange: -1.2, name: 'Amazon.com Inc.', category: 'Consumer Discretionary' },
    { symbol: 'TSLA', price: 900.65, percentChange: 9, name: 'Tesla Inc.', category: 'Consumer Discretionary' },
    { symbol: 'AAPL', price: 148.90, percentChange: -2.1, name: 'Apple Inc.', category: 'Technology' },
    { symbol: 'GOOGL', price: 2825.30, percentChange: 6, name: 'Alphabet Inc.', category: 'Technology' },
    { symbol: 'MSFT', price: 305.75, percentChange: -0.3, name: 'Microsoft Corporation', category: 'Technology' },
    { symbol: 'AMZN', price: 3550.20, percentChange: 1.7, name: 'Amazon.com Inc.', category: 'Consumer Discretionary' },
    { symbol: 'TSLA', price: 920.10, percentChange: -4.5, name: 'Tesla Inc.', category: 'Consumer Discretionary' }
  ];
  stocks$!: Observable<Stock[]>;

  ngOnInit() {
    this.stocks$ = from(this.stocks).pipe(
      filter(stock => stock.percentChange > 5),
      map(stock => ({
        symbol: stock.symbol,
        price: stock.price,
        percentChange: stock.percentChange
      })),
      toArray()
    );
  }
}
