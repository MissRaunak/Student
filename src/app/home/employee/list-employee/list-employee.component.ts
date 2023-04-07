import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceService } from 'src/app/service.service';
// import * as _ from 'lodash';
import { MatSelectChange } from '@angular/material/select';
import { MatSelectionList } from '@angular/material/list';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NgModel } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
// import { delay } from 'lodash';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})

export class ListEmployeeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  table: any;
  constemplist: any;


  constructor(private service: ServiceService) { }

  displayedColumns = [
    'id', 'pic', 'firstName', 'middleName',
    'lastName', 'email', 'mobile',
    'address',
    'state', 'city', 'dob', 'action',
  ];
  col = [
    'id', 'pic', 'firstName', 'middleName',
    'lastName', 'email', 'mobile',
    'address',
    'state', 'city', 'dob', 'action',
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public columnshowhide: customcol[] = []


  employeelist: any;
  isspinner = false;
  ngOnInit(): void {
    this.displayedColumns.forEach((element, index) => {
      this.columnshowhide.push({
        position: index,
        name: element,
        value: element,
        isactive: true,
      })
      this.columnshowhide.splice(index, 1);
    })

    this.editemployee();
  }
  selected = [];
  refresh(): void {
    this.editemployee();
  }

  editemployee() {
    this.isspinner = true;
    this.service.getemployeelist().subscribe((res) => {
      this.employeelist = res;
      console.log("mydata", this.employeelist)
      // this.dataSource.data = this.employeelist;
      // this.isspinner = false;
      // console.log("data", this.dataSource.data)
      const emp = this.employeelist;
      this.constemplist = [...this.employeelist];
      console.log(emp);
      this.dataSource = new MatTableDataSource(emp)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort;
      // this.sort.active = 'position';
      // this.sort.direction = 'asc';
      // this.sort.disableClear = true;
    });
  }

  deletedata(id: any) {
    this.service.deletedata(id).subscribe(_res => {
      this.editemployee()
    });
  }

  /*------------- search Fitter ------------*/
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /*------------- column Fitter ------------*/
  data: any
  selection = new SelectionModel<any>(true, []);
  get allSelected(): boolean {
    return this.selection.selected.length === this.columnshowhide?.length
      ;
  }
  selectAll() {
    if (this.allSelected) {
      length = this.col.length
      console.log(this.col.length)
      for (let i = 0; i < length; i++) {
        if (this.col[i] == "filter") { }
        else {
          this.displayedColumns.push(this.col[i]);
          this.selection.clear();
        }
      }

    } else {
      this.selection.select(...this.columnshowhide);
      length = this.col.length
      console.log(this.col.length)
      for (let i = 0; i < length; i++) {
        if (this.displayedColumns[i] == "filter") { }
        else {
          this.displayedColumns.splice(i);

        }
      }
    }
  }
  columntoggle(item: any) {
    if (!item.isactive) {
      item.isactive = true
      if (item.position > this.displayedColumns.length - 1) {
        this.displayedColumns.push(item.name);
      } else {
        this.displayedColumns.splice(item.position, 0, item.name);
      }
    } else {
      item.isactive = false
      let i = this.displayedColumns.indexOf(item.name);
      let opr = i > -1 ? this.displayedColumns.splice(i, 1) : undefined;
    }
  }
  removeColumn() {
    if (this.allSelected) {
      this.selection.clear();
    } else {
      this.selection.select(...this.columnshowhide);
    }
  }


  get mainselect(): boolean {
    return this.selection.selected.length === this.constemplist?.length;
  }
  mainfun() {
    if (this.mainselect) {
      this.selection.clear();
      this.employeelist.push(...this.constemplist)
      this.dataSource = new MatTableDataSource(this.employeelist);

    } else {
      this.selection.select(...this.employeelist);
      this.employeelist.splice(this.employeelist)
      this.dataSource = new MatTableDataSource(this.employeelist);
    }
  }


  tog: boolean = true
  rowtoggle(item: any) {

    if (this.tog) {
      this.tog = false
      const index = this.employeelist.indexOf(item, 0);
      console.log(index)
      this.employeelist.splice(index, 1);
      this.dataSource = new MatTableDataSource(this.employeelist)
      this.dataSource._updateChangeSubscription();

    } else {
      this.tog = true
      this.employeelist.push(item);
      this.dataSource = new MatTableDataSource(this.employeelist)
    }
  }


}

interface customcol {
  position: number;
  name: string;
  value: string;
  isactive: boolean;
}
