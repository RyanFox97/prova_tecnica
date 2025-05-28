import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTPService } from '../../http.service';
import { map } from 'rxjs';

interface Data {
  nome?: string;
  data?: string;
  versione?: number;
  autore?: string;
  commento?: string
}

interface Column {
  header: string,
  field: keyof Data,
  direction: boolean|null
}

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  tableName!: string;

  columns!: Column[];
  originalData!: Data[];
  filterData!: Data[];

  constructor(
    private readonly router: Router, 
    private readonly _httpS: HTTPService
  ){}

  ngOnInit(): void {
    let path = "";
    if(this.router.url.includes("repos")) path = "repos"
    else if(this.router.url.includes("commit")) path = "commit";
    this._httpS.get(path + ".json").pipe(
      map((value: any) => {
        this.tableName = "TABELLA " + path.toUpperCase();
        console.log(value);
        this.originalData = value.data
        this.filterData = this.originalData.slice();
        this.columns = value.columns
      })
    ).subscribe();
  }

  sort(column: Column){
    this.columns.forEach(c => c.header != column.header ? c.direction = null : null);
    if(column.direction !== false){
      column.direction = !column.direction;
      this.filterData.sort((a: Data, b: Data) => {
        return this.compare(a[column.field], b[column.field], column.direction); 
      });
    } else {
      column.direction = null;
      this.filterData = this.originalData;
    }
  }

  compare(a: any, b: any, isAsc: boolean|null){
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
