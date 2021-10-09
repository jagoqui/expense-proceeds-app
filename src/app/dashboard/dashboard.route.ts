import { Routes } from '@angular/router';
import { ItemStatisticsComponent } from './components/item-statistics/item-statistics.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ItemsListComponent } from './components/items-list/items-list.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: ItemStatisticsComponent
  },
  {
    path: 'expense-proceeds',
    component: AddItemComponent
  },
  {
    path: 'detail',
    component: ItemsListComponent
  }
];
