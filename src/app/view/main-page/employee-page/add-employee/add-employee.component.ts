import { EmployeePageService } from './../../../../service/main-page/employee-page/employee-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public gender: string = "MALE";
  public firstName: string = "";
  public lastName: string = "";
  public address: string = "";
  public city: string = "";
  public email: string = "";
  public date: Date = new Date();
  public id: string = "";
  public ids: string[] = [];

  constructor(
    public employeePageService: EmployeePageService,
  ) { }

  ngOnInit(): void {
    this.employeePageService.getAllIdDepartment().subscribe(data => {
      for (let i = 0; i < data.data.length; i++) {
        this.ids.push(data.data[i].id);
      }
      this.id = this.ids[0];
    })
  }

  public addEmployee(): void {
    if (this.firstName.trim().length != 0
      && this.lastName.trim().length != 0
      && this.email.trim().length != 0
      && this.address.trim().length != 0
      && this.city.trim().length != 0
    ) {
      let dob = `${this.date.getFullYear()}-${this.date.getMonth()+1}-${this.date.getDate()}`;
      let body = {
        address: this.address,
        city: this.city,
        doB: dob,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        department: parseInt(this.id),
      };
      this.employeePageService.addNewEmployee(body).subscribe(data => {
        console.log(data);
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.address = "";
        this.city = "";
        this.employeePageService.loadData(0);
      });
    }
  }


}
