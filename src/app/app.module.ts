import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ListEmployeeComponent } from './home/employee/list-employee/list-employee.component';
// import { DashboardComponent } from './home/employee/dashboard/dashboard.component';
// import { AddEditEmployeeComponent } from './home/employee/add-edit-employee/add-edit-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    // ListEmployeeComponent,
    // DashboardComponent,
    // AddEditEmployeeComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
