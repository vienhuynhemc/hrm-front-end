import { NotificationService } from './../../notification/notification.service';
import { Department } from './../../../model/department';
import { HttpClient } from '@angular/common/http';
import { Employee } from './../../../model/employee';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Date } from 'src/app/model/date';

@Injectable({
  providedIn: 'root'
})
export class EmployeePageService {

  private isEditEmployee: boolean = false;
  public inputSearch: string = "";
  private sortString: string = "ASC"
  public mainAttribute: string = "First name"
  private mainAttributes: string[] = [
    "First name",
    "Last name",
    "Address",
    "City",
    "Email",
  ];

  public gender: string[] = [
    "MALE",
    "FEMALE",
  ];

  public isLoadData: boolean = false;
  public isOutOfData: boolean = false;
  public employees: Employee[] = [];

  public editFirstName: string = "";
  public editLastName: string = "";
  public editGender: string = "";
  public editId: number = 0;
  public editDoB: string | undefined;
  public editEmail: string = "";
  public editAddress: string = "";
  public editCity = "";
  public editDepartmentId: number = 0;

  public idEmployeeNeedRemove: number = 0;
  public isShowPopupRequest: boolean = false;
  public isShowNotification: boolean = false;
  public isProcessRemove: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  public getStringMainAttribute(): string {
    if (this.mainAttribute == 'Last name') {
      return "lastName";
    }
    if (this.mainAttribute == 'First name') {
      return "firstName";
    }
    if (this.mainAttribute == 'Address') {
      return "address";
    }
    if (this.mainAttribute == 'City') {
      return "city";
    }
    return "email";
  }

  public loadData(event: number) {
    this.isOutOfData = false;
    this.employees = [];
    this.getListEmployee(
      0,
      25,
      this.inputSearch,
      this.getStringMainAttribute(),
      this.getSortString() == "ASC" ? "asc" : "desc",
      event
    );
  }

  public getListEmployee(min: number, max: number, search: string, mainAttribute: string, sort: string, event: number) {
    this.isLoadData = true;
    document.getElementById("content-list-e")!.scrollTop = 99999999;
    setTimeout(() => {
      this.getListEmployeeFromAPI(min, max, search, mainAttribute, sort,).subscribe(data => {
        if (event == 1) {
          this.employees = [];
        }
        for (let i = 0; i < data.data.length; i++) {
          let employee = new Employee();
          employee.id = data.data[i].id;
          employee.firstName = data.data[i].firstName;
          employee.lastName = data.data[i].lastName;
          employee.gender = data.data[i].gender;
          let date = new Date();
          date.year = data.data[i].doB[0];
          date.month = data.data[i].doB[1];
          date.day = data.data[i].doB[2];
          employee.doB = date;
          employee.email = data.data[i].email;
          employee.address = data.data[i].address;
          employee.city = data.data[i].city;
          let department = new Department();
          department.id = data.data[i].department.id;
          department.name = data.data[i].department.name;
          department.location = data.data[i].department.location;
          employee.department = department;
          this.employees.push(employee);
        }
        if (data.data.length < max || data.data.length == 0) {
          this.isOutOfData = true;
        }
        this.isLoadData = false;
      })
    }, 1000);
  }

  public addNewEmployee(body: object) {
    const url = `${environment.REST_API}employee`;
    return this.httpClient.post<any>(url, body);
  }

  public getListEmployeeFromAPI(
    min: number,
    max: number,
    search: string,
    mainAttribute: string,
    sort: string) {
    const url = `${environment.REST_API}employee/part?min=${min}&max=${max}&sort=${sort}&search=${search}&mainAttribute=${mainAttribute}`;
    return this.httpClient.get<any>(url);
  }

  public saveItem() {
    if (this.editFirstName.trim().length != 0
      && this.editLastName.trim().length != 0
      && this.editEmail.trim().length != 0
      && this.editAddress.trim().length != 0
      && this.editCity.trim().length != 0
    ) {
      this.saveEmployee().subscribe(data => {
        console.log(data);
        this.isShowPopupRequest = false;
        this.isShowNotification = true;
        if (data.message == "Exists email") {
          this.notificationService.titlePopUpNotificationEmployee = "Failure";
          this.notificationService.childPopUpNotificationEmployee = `Already exists staff with email: ${this.editEmail}`;
        } else {
          this.notificationService.titlePopUpNotificationEmployee = "Success";
          this.notificationService.childPopUpNotificationEmployee = `You have successfully updated the employee #${this.editId}`;
          this.hiddenEditEmployee();
          this.loadData(0);
        }
      })
    }
  }

  public getAllIdDepartment() {
    const url = `${environment.REST_API}department`
    return this.httpClient.get<any>(url);
  }

  public deleteEmployeeById(id: number) {
    const url = `${environment.REST_API}employee/${id}`;
    return this.httpClient.delete<any>(url);
  }

  public saveEmployee() {
    const url = `${environment.REST_API}employee/${this.editId}`;
    console.log(url);
    let body = {
      address: this.editAddress,
      city: this.editCity,
      doB: this.editDoB!.slice(0, 10),
      email: this.editEmail,
      firstName: this.editFirstName,
      lastName: this.editLastName,
      gender: this.editGender,
      department: this.editDepartmentId,
    }
    return this.httpClient.put<any>(url, body);
  }



  public isShowEditEmployee(): boolean {
    return this.isEditEmployee;
  }

  public showEditEmployee(): void {
    this.isEditEmployee = true;
  }

  public hiddenEditEmployee(): void {
    this.isEditEmployee = false;
  }

  public getMainAttributes(): string[] {
    return this.mainAttributes;
  }

  public getSortString(): string {
    return this.sortString;
  }

  public changeSort(newSort: string): void {
    this.sortString = newSort;
  }
}
