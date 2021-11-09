import { EmployeePageService } from './../../../../service/main-page/employee-page/employee-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  public ids: string[] = [];

  constructor(
    public employeePageService: EmployeePageService
  ) { }

  ngOnInit(): void {
    this.employeePageService.getAllIdDepartment().subscribe(data => {
      for (let i = 0; i < data.data.length; i++) {
        this.ids.push(data.data[i].id);
      }
    })
  }

  public saveEmployee(): void {
    if (this.employeePageService.editFirstName.trim().length != 0
      && this.employeePageService.editLastName.trim().length != 0
      && this.employeePageService.editEmail.trim().length != 0
      && this.employeePageService.editAddress.trim().length != 0
      && this.employeePageService.editCity.trim().length != 0
    ) {
      this.employeePageService.saveEmployee().subscribe(data => {
        console.log(data);
        this.employeePageService.hiddenEditEmployee();
        this.employeePageService.loadData(0);
      })
    }
  }

  public back(): void {
    this.employeePageService.hiddenEditEmployee();
  }

}
