import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.render()
  }

  render() {
    new Chart("piechart", {  // Updated ID to "piechart"
      type: 'doughnut',
      data: {
        labels: ['Emissions', 'Reductions'],
        datasets: [{
          label: '# of event',
          data: [145.583, 28.596],
          backgroundColor: ['orange', 'green'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
