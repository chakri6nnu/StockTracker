import { Component, OnInit } from '@angular/core';
import { StocksList } from 'src/app/interfaces';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {
  stocksList$ = this._localStorageServicee.stocksList$
  constructor(
    private _localStorageServicee:LocalStorageService
  ){
   
  }

  ngOnInit(): void {
  }
}
