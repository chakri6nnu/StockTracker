import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StocksList } from '../../interfaces';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private _stockInfo$ = new BehaviorSubject<StocksList[]>([]);
  public stocksList$ = this._stockInfo$.asObservable();
  private _localStorage: Storage;
  constructor(private _localStorageRefService: LocalStorageRefService) {
    this._localStorage = _localStorageRefService.localStorage;
    this.setInitData();
  }

  setInitData(){
    const data = JSON.parse(this._localStorage.getItem('stocksList') || '[]');
    this._stockInfo$.next(data);
  }
  getStockInfo(){ 
    return this._stockInfo$.asObservable();
  }

  setStockInfo(data: StocksList[]) {
    const jsonData = JSON.stringify(data);
    this._localStorage.setItem('stocksList', jsonData);
    this._stockInfo$.next(data);
  }

 clearInfo() {
    this._localStorage.removeItem('stocksList');
    this._stockInfo$.next([]);
  }
}
