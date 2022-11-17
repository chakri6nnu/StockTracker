import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentimentComponent } from './sentiment.component';
import { SentimentRoutingModule } from './sentiment-routing.module';
import { FinnhubService } from '../../services/finnhub/finnhub.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [SentimentComponent],
  imports: [
    CommonModule,
    SentimentRoutingModule,
    HttpClientModule
  ],
  providers:[FinnhubService]
})
export class SentimentModule { }
