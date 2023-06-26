import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export interface UserData {
  id: string;
  userId: string;
  title: any;
  body: any;
}

const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'type', 'description'];
  dataSource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((data)=>{
      
    console.log(data);
    this.posts = data;
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.posts);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
    this.renderChart();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  renderChart() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dataList = [
      { car: 100, transit: 200, plane: 50, energy: 150, food: 75, fuel: 100 },
      { car: 120, transit: 180, plane: 70, energy: 170, food: 90, fuel: 110 },
      // Add more objects for each month...
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

  new Chart("doughnutchart", {
    type: 'pie',
    data: {
      labels: ['Trees planted', 'Cleaned area', 'Recycled', 'Event participated'],
      datasets: [{
        label: '# of event',
        data: [12, 6, 3, 5],
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

  new Chart("piechart", {
    type: 'doughnut',
    data: {
      labels: ['Trees planted', 'Cleaned area', 'Recycled', 'Event participated'],
      datasets: [{
        label: '# of event',
        data: [12, 6, 3, 5],
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

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    userId: name,
    title: Math.round(Math.random() * 100).toString(),
    body: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
