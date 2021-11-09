import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

// Lottie
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
export function playerFactory() {
  return player;
}
// thư viện get request
import { HttpClientModule } from '@angular/common/http';
// tooltip
import { MatTooltipModule } from '@angular/material/tooltip';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { MainPageComponent } from './view/main-page/main-page.component';
import { DepartmentPageComponent } from './view/main-page/department-page/department-page.component';
import { EmployeePageComponent } from './view/main-page/employee-page/employee-page.component';
import { AddDepartmentComponent } from './view/main-page/department-page/add-department/add-department.component';
import { ShowDepartmentComponent } from './view/main-page/department-page/show-department/show-department.component';
import { EditDepartmentComponent } from './view/main-page/department-page/edit-department/edit-department.component';
import { AddEmployeeComponent } from './view/main-page/employee-page/add-employee/add-employee.component';
import { ShowEmployeeComponent } from './view/main-page/employee-page/show-employee/show-employee.component';
import { EditEmployeeComponent } from './view/main-page/employee-page/edit-employee/edit-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
    MainPageComponent,
    DepartmentPageComponent,
    EmployeePageComponent,
    AddDepartmentComponent,
    ShowDepartmentComponent,
    EditDepartmentComponent,
    AddEmployeeComponent,
    ShowEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    // http
    HttpClientModule,
    // lottie
    LottieModule.forRoot({ player: playerFactory }),
    // tooltip
    MatTooltipModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
