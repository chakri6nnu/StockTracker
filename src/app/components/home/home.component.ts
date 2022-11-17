import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Subject, takeUntil } from 'rxjs';
import { AppService } from './../../app.service';
import { FinnhubAPIInfo, QueryResult, Searchresults, StocksList } from './../../interfaces';
import { FinnhubService } from './../../services/finnhub/finnhub.service';
import { LoadingService } from './../../services/loading/loading.service';
import { LocalStorageService } from './../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  title = 'Stock Tracker';
  public loading$ = this.loader.loading$
  private ngUnsubscribe: Subject<void> = new Subject();
  private stocksList:StocksList[] = [];

  constructor(
    private appService:AppService,
    public loader: LoadingService,
    private finnhubService:FinnhubService,
    private localStorageService:LocalStorageService
    ){
     
      this.localStorageService.getStockInfo().pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((_stockInfo:StocksList[]) => {
         // Load the stock from local storage
        this.stocksList = _stockInfo;
      }) 
      
      this.appService.getRemoveSymbol().pipe(
        takeUntil(this.ngUnsubscribe)
      ).subscribe((_symbol:string) => {
        // Remove action
        this.removeSymbol(_symbol);
      }) 
  }

  ngOnInit() {}

  onSubmit(stockInput:string){
    const isExist = this.stocksList.filter((res:StocksList) => {
      return res.stockInfo.symbol === stockInput;
    });
    if(isExist.length > 0){      
      return; // Return if already exist
    }
    this.loader.show();
    combineLatest({
      currentStock: this.finnhubService.getCurrentStock(stockInput),
      symbolInfo: this.finnhubService.getSymbolInfo(stockInput)
    })    
    .pipe(
      takeUntil(this.ngUnsubscribe)
    )
    .subscribe((data:FinnhubAPIInfo) => {
      const symbolInfo:Searchresults = data.symbolInfo;
      const symbolInfomatch = symbolInfo.result.filter((res:QueryResult) => {
          return res.symbol === stockInput;
      });
      if(symbolInfomatch.length > 0){
        this.stocksList.push({
          stockInfo:symbolInfomatch[0],
          quote:data.currentStock
        })
        this.localStorageService.setStockInfo(this.stocksList);
      }
      this.loader.hide();
    });
  }

  removeSymbol(_symbol:string){
    if(_symbol != ''){
      console.log('removed item: ',_symbol)
      var index = this.stocksList.findIndex((item:StocksList) => {
        return item.stockInfo.symbol === _symbol;
      });
      this.stocksList.splice(index,1); // Remove item by index
      this.localStorageService.setStockInfo(this.stocksList);
      this.appService.setRemoveSymbol('');
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
