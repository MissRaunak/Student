import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MatModule } from 'src/app/mat/mat.module';
@NgModule({
  declarations: [
    EmployeeComponent,
    AddEditEmployeeComponent,
    ListEmployeeComponent,
    DashboardComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatModule,
    MatPaginatorModule

  ]
})
export class EmployeeModule { }
