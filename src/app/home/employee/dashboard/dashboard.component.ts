import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employeelist: any;

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.getemployeelist().subscribe((res) => {
      this.employeelist = res;
    });
  }
  get totalRows(): number {
    return this.employeelist?.length;
  }

}
