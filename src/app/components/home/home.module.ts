import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { StocksListComponent } from '../stocks-list/stocks-list.component';
import { HeaderComponent } from '../header/header.component';
import { StockComponent } from '../stock/stock.component';
import { AppService } from 'src/app/app.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { FinnhubService } from 'src/app/services/finnhub/finnhub.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { LocalStorageRefService } from 'src/app/services/local-storage/local-storage-ref.service';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    HomeComponent,
    StocksListComponent,
    HeaderComponent,
    StockComponent  
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HomeRoutingModule
  ],
  providers: [
    AppService,
    LoadingService,
    FinnhubService,
    LocalStorageService,
    LocalStorageRefService
  ],

})
export class HomeModule { }
