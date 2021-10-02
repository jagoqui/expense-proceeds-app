import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StadiComponent } from './components/stadi/stadi.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DetailComponent } from './components/detail/detail.component';



@NgModule({
  declarations: [
    StadiComponent,
    StatisticsComponent,
    DetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExpenseProceedsModule { }
