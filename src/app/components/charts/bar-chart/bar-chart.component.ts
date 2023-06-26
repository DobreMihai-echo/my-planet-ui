import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
Chart.register(...registerables);


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.renderChart()
  }

  renderChart() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dataList = [
      { car: 100, transit: 200, plane: 50, energy: 150, food: 75, fuel: 100 },
      { car: 120, transit: 180, plane: 70, energy: 170, food: 90, fuel: 110 },
    ];
    
    const categoryLabels = ['car', 'transit', 'plane', 'energy', 'food', 'fuel'];
    
    const datasets = categoryLabels.map((category, index) => ({
      label: category.toUpperCase(),
      data: dataList.map(obj => obj[category]),
      backgroundColor: generateRandomColor(index, 0.7)
    }));
    
    function generateRandomColor(index: number, opacity: number): string {
      const hue = (index * 55) % 360;
      return `hsla(${hue}, 100%, 50%, ${opacity})`;
    }
    
    new Chart("barchart", {
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
