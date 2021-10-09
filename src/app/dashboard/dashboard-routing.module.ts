import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard.route';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
