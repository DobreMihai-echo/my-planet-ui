import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  ngOnInit(): void {
    this.renderLineChart();
  }

  renderLineChart() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dataList = [
      { car: 100, transit: 200, plane: 50, energy: 150, food: 75, fuel: 100 },
      { car: 120, transit: 180, plane: 70, energy: 170, food: 90, fuel: 110 },
    ];

    const categoryLabels = Object.keys(dataList[0]);
    const lineDatasets = categoryLabels.map((category, index) => ({
      label: category.toUpperCase(),
      data: dataList.map(obj => obj[category]),
      borderColor: generateRandomColor(index, 0.7),
      fill: false
    }));

    const lineChartData = {
      labels: months,
      datasets: lineDatasets
    };

    const lineChartOptions = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    new Chart('linechart', {
      type: 'line',
      data: lineChartData,
      options: lineChartOptions
    });
  }
}

function generateRandomColor(index: number, opacity: number): string {
  const hue = (index * 55) % 360;
  return `hsla(${hue}, 100%, 50%, ${opacity})`;
}
