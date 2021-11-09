import { NotificationService } from './../../../../service/notification/notification.service';
import { EmployeePageService } from './../../../../service/main-page/employee-page/employee-page.service';
import { Component, Input, OnInit } from '@angular/core';

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
  public date: string = new Date().toISOString().slice(0, 16);
  public id: string = "";
  public ids: string[] = [];

  constructor(
    public employeePageService: EmployeePageService,
    private notificationService: NotificationService
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
      let body = {
        address: this.address,
        city: this.city,
        doB: this.date.slice(0, 10),
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        department: parseInt(this.id),
      };
      this.employeePageService.addNewEmployee(body).subscribe(data => {
        console.log(data);
        this.employeePageService.isShowNotification = true;
        if (data.status == "500 INTERNAL_SERVER_ERROR") {
          this.notificationService.titlePopUpNotificationEmployee = "Failure";
          this.notificationService.childPopUpNotificationEmployee = `Already exists staff with email: ${this.email}`;
        } else {
          this.notificationService.titlePopUpNotificationEmployee = "Success";
          this.notificationService.childPopUpNotificationEmployee = `You have successfully added the employee #${data.data.id}`;
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.address = "";
          this.city = "";
          this.employeePageService.loadData(0);
        }
      });
    }
  }


}
