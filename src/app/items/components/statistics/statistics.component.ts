import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/aap.reducer';
import { Store } from '@ngrx/store';
import { Item } from '../../../shared/models/expense-proceeds.model';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: []
})
export class StatisticsComponent implements OnInit {
  numExpenses: number = 0;
  numProceeds: number = 0;
  totalExpenses: number = 0;
  totalProceeds: number = 0;

  chartType: ChartType = 'doughnut';
  chartLabels: Label[] = ['Egresos', 'Ingresos'];
  chartDataSets: ChartDataSets[] = [];
  chartOptions: ChartOptions = {
    responsive: true
  };

  constructor(private storeSvc: Store<AppState>) {}

  staticsGenerate(items: Item[]) {
    this.numExpenses = 0;
    this.numProceeds = 0;
    this.totalExpenses = 0;
    this.totalProceeds = 0;
    for (const item of items) {
      if (item.type === 'expense') {
        this.totalExpenses += item.mount;
        this.numExpenses++;
      } else {
        this.totalProceeds += item.mount;
        this.numProceeds++;
      }
    }
    this.chartDataSets = [{ data: [this.totalProceeds, this.totalExpenses], label: 'Ingresos' }];
  }

  ngOnInit(): void {
    this.storeSvc.select('items').subscribe(({ items }) => this.staticsGenerate(items));
  }
}
