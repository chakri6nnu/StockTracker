import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { InsiderSentiment, StocksList } from '../../interfaces';
import { FinnhubService } from '../../services/finnhub/finnhub.service';
import { LoadingService } from '../../services/loading/loading.service';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {
  public stockInfo:InsiderSentiment | null = null;
  private ngUnsubscribe: Subject<void> = new Subject();
  public loading$ = this.loader.loading$
  private stocksList:StocksList[] = [];
  public monthList:string[] = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  constructor(
      private router: Router,
      public loader: LoadingService,
      private route: ActivatedRoute,
      private localStorageService:LocalStorageService,
      private finnhubService:FinnhubService
     ) {
    this.localStorageService.getStockInfo().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((_stockInfo:StocksList[]) => {
      this.stocksList = _stockInfo;
    }) 
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => { 
        this.getInsiderSentiment(params.get('symbol'));
    });
  }
  getFirstDayOfMonth(year:number, month:number) {
    return new Date(year, month, 1);
  }
  dateFormat(inputDate:Date) {
    let date, month, year;
  
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
  
      date = date
          .toString()
          .padStart(2, '0');
  
      month = month
          .toString()
          .padStart(2, '0');
  
    return `${year}-${month}-${date}`;
  }
  getInsiderSentiment(symbol:string | null){
    if(!symbol){
      this.router.navigate(['']);
      return;
    }
    this.loader.show();
    const isExist = this.stocksList.filter((res:StocksList) => {
      return res.stockInfo.symbol === symbol;
    });

    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const toDate = this.getFirstDayOfMonth(
      date.getFullYear(),
      date.getMonth(),
    );

    const dateTo = new Date();
    dateTo.setMonth(dateTo.getMonth() - 3);
    const fromDate = this.getFirstDayOfMonth(
      dateTo.getFullYear(),
      dateTo.getMonth(),
    );
    this.finnhubService.getInsiderSentiment(""+symbol,this.dateFormat(fromDate),this.dateFormat(toDate))
    .pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((result:InsiderSentiment) => {    
      this.stockInfo = result;
      this.stockInfo.description = isExist[0].stockInfo.description;
      this.loader.hide();
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
