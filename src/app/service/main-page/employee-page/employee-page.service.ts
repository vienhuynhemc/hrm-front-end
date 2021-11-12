import {NotificationService} from '../../notification/notification.service';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../../model/employee';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeePageService {

  public isEditEmployee: boolean = false;
  public inputSearch: string = "";
  public sortString: string = "ASC"
  public mainAttribute: string = "First name"
  public mainAttributes: string[] = [
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
  ) {
  }

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
      this.sortString == "ASC" ? "asc" : "desc",
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
          let employee: Employee = {
            id: data.data[i].id,
            address: data.data[i].address,
            city: data.data[i].city,
            department: {
              id: data.data[i].department.id,
              location: data.data[i].department.location,
              member: 0,
              name: data.data[i].department.name,
            },
            doB: {
              day: data.data[i].doB[2],
              format: this.getFormat(data.data[i].doB[2], data.data[i].doB[1], data.data[i].doB[0]),
              month: data.data[i].doB[1],
              year: data.data[i].doB[0],
            },
            email: data.data[i].email,
            firstName: data.data[i].firstName,
            gender: data.data[i].gender,
            lastName: data.data[i].lastName,
          };
          this.employees.push(employee);
        }
        if (data.data.length < max || data.data.length == 0) {
          this.isOutOfData = true;
        }
        this.isLoadData = false;
      })
    }, 1000);
  }

  public getFormat(day: number, month: number, year: number): string {
    let d = day < 10 ? "0" + day : day;
    let m = month < 10 ? "0" + month : month;
    return `${d}/${m}/${year}`;
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
          this.isEditEmployee = false;
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

}
