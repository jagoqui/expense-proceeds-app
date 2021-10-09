import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ItemStatisticsComponent } from './components/item-statistics/item-statistics.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { FilterItemsPipe } from './pipes/filter-items.pipe';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { itemsReducer } from './redux/items.reducer';

@NgModule({
  declarations: [ItemStatisticsComponent, ItemsListComponent, AddItemComponent, FilterItemsPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    ChartsModule,
    StoreModule.forFeature('items', itemsReducer)
  ]
})
export class DashboardModule {}
