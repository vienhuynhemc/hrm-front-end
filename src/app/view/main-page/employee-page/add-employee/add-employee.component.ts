import {NotificationService} from '../../../../service/notification/notification.service';
import {EmployeePageService} from '../../../../service/main-page/employee-page/employee-page.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Department} from "../../../../model/department";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  public ids: Department[] = [];

  public form: FormGroup = this.formBuilder.group(
    {
      gender: ['MALE',],
      firstName: ['', [Validators.required, this.employeePageService.validatorMinLengthFirstName, this.employeePageService.validatorMaxLengthFirstName]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      id: ['',],
      date: [new Date().toISOString().slice(0, 16),]
    }
  );

  public enteredFirstName: boolean = false;
  public enteredLastName: boolean = false;
  public enteredAddress: boolean = false;
  public enteredCity: boolean = false;
  public enteredEmail: boolean = false;
  public existEmail: boolean = false;
  public isShowNotification: boolean = false;

  constructor(
    public employeePageService: EmployeePageService,
    public notificationService: NotificationService,
    private formBuilder: FormBuilder,
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
      this.form.patchValue(
        {
          id: this.ids[0].id + "",
        }
      );
    })
    setTimeout(() => {
      document.getElementById("enterFistName")?.focus();
    }, 0);
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
    if (!this.form.controls['email']?.errors) {
      let email = this.form.value.email;
      this.employeePageService.checkEmail(email, -1).subscribe(data => {
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

  public resetFill(): void {
    this.enteredFirstName = false;
    this.enteredLastName = false;
    this.enteredAddress = false;
    this.enteredCity = false;
    this.enteredEmail = false;
  }

  public fullErrorFill(): void {
    this.enteredFirstName = true;
    this.enteredLastName = true;
    this.enteredAddress = true;
    this.enteredCity = true;
    this.enteredEmail = true;
  }

  public addEmployee(): void {
    this.fullErrorFill();
    if (this.form.valid && !this.existEmail) {
      let body = {
        address: this.form.value.address,
        city: this.form.value.city,
        doB: this.form.value.date.slice(0, 10),
        email: this.form.value.email,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        gender: this.form.value.gender,
        department: parseInt(this.form.value.id),
      };
      this.employeePageService.addNewEmployee(body).subscribe(data => {
        console.log(data);
        this.form.patchValue(
          {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            city: "",
          }
        );
        this.resetFill();
        document.getElementById("enterFistName")?.focus();
        this.notificationService.titlePopUpNotificationEmployee = `You have successfully added the employee #${data.data.id}!`;
        this.employeePageService.loadData(0);
        this.isShowNotification = true;
      });
    }
  }

  public back(): void {
    this.employeePageService.isAddEmployee = false;
  }

}
