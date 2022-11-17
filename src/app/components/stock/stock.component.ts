import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { StocksList } from '../../interfaces';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  @Input() stock:StocksList | null = null;
  constructor(private appService:AppService) { }

  ngOnInit(): void {
  }
  removeItem(stockInput:string){
    this.appService.setRemoveSymbol(stockInput);    
  }
}
