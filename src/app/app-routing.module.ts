import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SentimentComponent } from './components/sentiment/sentiment.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'sentiment/:symbol',
    loadChildren: () => import('./components/sentiment/sentiment.module').then(m => m.SentimentModule)
  },
  {
    path: '**',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
