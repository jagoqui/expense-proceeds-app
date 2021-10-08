import { Routes } from '@angular/router';
import { StatisticsComponent } from '../items/components/statistics/statistics.component';
import { ItemsComponent } from '../items/components/items/items.component';
import { DetailComponent } from '../items/components/detail/detail.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: StatisticsComponent
  },
  {
    path: 'expense-proceeds',
    component: ItemsComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  }
];
