import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  stockInput:string = '';
  @Output()
  onSubmit = new EventEmitter<string>();
  constructor() { }
  ngOnInit(): void {
  }

  submitAction(){
    this.onSubmit.emit(this.stockInput);
    this.stockInput = '';
  }

}
