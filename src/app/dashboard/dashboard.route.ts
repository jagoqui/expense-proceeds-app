import {Routes} from "@angular/router";
import {StatisticsComponent} from "../expense-proceeds/components/statistics/statistics.component";
import {ExpenseProceedsComponent} from "../expense-proceeds/components/expense-proceeds/expense-proceeds.component";
import {DetailComponent} from "../expense-proceeds/components/detail/detail.component";

export const dashboardRoutes: Routes = [
  {
    path: '', component: StatisticsComponent
  },
  {
    path: 'expense-proceeds',
    component: ExpenseProceedsComponent
  },
  {
    path: 'detail',
    component: DetailComponent
  }
];
