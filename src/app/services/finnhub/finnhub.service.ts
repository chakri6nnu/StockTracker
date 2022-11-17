import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { InsiderSentiment, Quote,Searchresults } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class FinnhubService {
  rootURL = environment.API_URL;
  constructor(private http: HttpClient) {}
  
  getCurrentStock(stockInput:string): Observable<Quote>{
    return this.http.get<Quote>(this.rootURL + '/quote?symbol='+stockInput+'&token='+environment.API_TOKEN);
  }

  getSymbolInfo(stockInput:string): Observable<Searchresults>{
    return this.http.get<Searchresults>(this.rootURL + '/search?q='+stockInput+'&token='+environment.API_TOKEN);
  }

  getInsiderSentiment(stockInput:string,from:string,to:string): Observable<InsiderSentiment>{
    return this.http.get<InsiderSentiment>(this.rootURL + '/stock/insider-sentiment?symbol='+stockInput+'&from='+from+'&to='+to+'&token='+environment.API_TOKEN);
  }

}
