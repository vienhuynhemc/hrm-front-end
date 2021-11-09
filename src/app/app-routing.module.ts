import { EmployeePageComponent } from './view/main-page/employee-page/employee-page.component';
import { DepartmentPageComponent } from './view/main-page/department-page/department-page.component';
import { MainPageComponent } from './view/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'department', pathMatch: 'full' },
      { path: 'department', component: DepartmentPageComponent },
      { path: 'employee', component: EmployeePageComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
