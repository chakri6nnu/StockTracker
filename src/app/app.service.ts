import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    private removeSymbol$ = new BehaviorSubject<string>('');
    constructor() {}
    setRemoveSymbol(input:string){
        this.removeSymbol$.next(input);
    }
    getRemoveSymbol(){ 
        return this.removeSymbol$.asObservable();
    }
}
