import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-carbon-footprint-chart',
  templateUrl: './carbon-footprint-chart.component.html',
  styleUrls: ['./carbon-footprint-chart.component.css']
})
export class CarbonFootprintChartComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataset[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor() {}
}
