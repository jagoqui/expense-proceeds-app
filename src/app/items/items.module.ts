import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { DetailComponent } from './components/detail/detail.component';
import { ItemsComponent } from './components/items/items.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [StatisticsComponent, DetailComponent, ItemsComponent, FilterItemsPipe],
  imports: [CommonModule, ReactiveFormsModule, ChartsModule]
})
export class ItemsModule {}
