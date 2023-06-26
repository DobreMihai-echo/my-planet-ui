import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-side-by-side-chart',
  templateUrl: './side-by-side-chart.component.html',
  styleUrls: ['./side-by-side-chart.component.css']
})
export class SideBySideChartComponent {
  constructor() { }

  ngOnInit(): void {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const dataList = [
      { emission: 100, reduction: 200 },
      { emission: 100, reduction: 180 },
    ];
  
    const categoryLabels = ['emission', 'reduction'];
  
    const datasets = categoryLabels.map((category, index) => ({
      label: category.toUpperCase(),
      data: dataList.map(obj => obj[category]),
      backgroundColor: index === 0 ? 'orange' : 'green'
    }));
  
    new Chart('sidechart', {
      type: 'bar',
      data: {
        labels: months,
        datasets: datasets
      },
      options: {
        indexAxis: 'x', // Arrange bars horizontally
        scales: {
          x: {
            stacked: false, // Disable stacking
            beginAtZero: true
          },
          y: {
            stacked: false // Disable stacking
          }
        }
      }
    });
  }
}
