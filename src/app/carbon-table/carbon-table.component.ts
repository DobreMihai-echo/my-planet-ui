import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CarbonTableDataSource, CarbonTableItem } from './carbon-table-datasource';

@Component({
  selector: 'app-carbon-table',
  templateUrl: './carbon-table.component.html',
  styleUrls: ['./carbon-table.component.css']
})
export class CarbonTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CarbonTableItem>;
  dataSource: CarbonTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    "id",
    "date",
    "name",
    "status",
    "orderTotal",
    "paymentMode",
  ];

  constructor() {
    this.dataSource = new CarbonTableDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
