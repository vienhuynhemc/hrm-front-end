import {NotificationService} from '../../../../service/notification/notification.service';
import {EmployeePageService} from '../../../../service/main-page/employee-page/employee-page.service';
import {Component, OnInit} from '@angular/core';
import {Department} from "../../../../model/department";

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  public ids: Department[] = [];

  public enteredFirstName: boolean = true;
  public enteredLastName: boolean = true;
  public enteredAddress: boolean = true;
  public enteredCity: boolean = true;
  public enteredEmail: boolean = true;
  public existEmail: boolean = false;

  constructor(
    public employeePageService: EmployeePageService,
    public notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.employeePageService.getAllIdDepartment().subscribe(data => {
      for (let i = 0; i < data.data.length; i++) {
        this.ids.push({
          id: data.data[i].id,
          name: data.data[i].name,
          member: 0,
          location: data.data[i].location,
        });
      }
    })
    setTimeout(() => {
      document.getElementById("enterEditFistName")?.focus();
    },);
  }

  public enteredFirstNameFirst(): void {
    if (!this.enteredFirstName) {
      this.enteredFirstName = true;
    }
  }

  public enteredLastNameFirst(): void {
    if (!this.enteredLastName) {
      this.enteredLastName = true;
    }
  }

  public enteredEmailFirst(): void {
    if (!this.enteredEmail) {
      this.enteredEmail = true;
    }
    if (!this.employeePageService.form.controls['email']?.errors) {
      let email = this.employeePageService.form.value.editEmail;
      this.employeePageService.checkEmail(email, this.employeePageService.editId).subscribe(data => {
        this.existEmail = data.status == "302 FOUND";
      })
    }
  }

  public enteredAddressFirst(): void {
    if (!this.enteredAddress) {
      this.enteredAddress = true;
    }
  }

  public enteredCityFirst(): void {
    if (!this.enteredCity) {
      this.enteredCity = true;
    }
  }

  public fullErrorFill(): void {
    this.enteredFirstName = true;
    this.enteredLastName = true;
    this.enteredAddress = true;
    this.enteredCity = true;
    this.enteredEmail = true;
  }


  public requestSaveEmployee() {
    this.fullErrorFill();
    if (this.employeePageService.form.valid && !this.existEmail) {
      this.notificationService.titlePopUpYesNoEmployee = "Update employee";
      this.notificationService.childPopUpYesNoEmployee = `Are you sure you want to update employee
    #${this.employeePageService.editId}?`
      this.employeePageService.isShowPopupRequest = true;
    }
  }

  public back(): void {
    this.employeePageService.isEditEmployee = false;
  }

}
