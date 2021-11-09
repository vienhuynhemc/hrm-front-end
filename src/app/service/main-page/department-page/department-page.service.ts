import { NotificationService } from './../../notification/notification.service';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'src/app/model/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentPageService {

  private isEditDepartment: boolean = false;
  public inputSearch: string = "";
  private sortString: string = "ASC"
  public mainAttribute: string = "Name"
  private mainAttributes: string[] = [
    "Name",
  ];

  public locations: string[] = [
    "HOCHIMINH",
    "DANANG",
    "CANTHO",
  ];

  public isLoadData: boolean = false;
  public isOutOfData: boolean = false;
  public departments: Department[] = [];

  public editName: string = "";
  public editLocation: string = "";
  public editId: number = 0;

  public idDepartmentNeedRemove: number = 0;
  public isShowPopupRequest: boolean = false;
  public isShowNotification: boolean = false;
  public isProcessRemove: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) { }

  public loadData(event: number) {
    this.isOutOfData = false;
    this.departments = [];
    this.getListDepartment(
      0,
      25,
      this.inputSearch,
      this.mainAttribute == "Name" ? "name" : "location",
      this.getSortString() == "ASC" ? "asc" : "desc",
      event
    );
  }

  public getListDepartment(min: number, max: number, search: string, mainAttribute: string, sort: string, event: number) {
    this.isLoadData = true;
    document.getElementById("content-list")!.scrollTop = 99999999;
    setTimeout(() => {
      this.getListDepartmentFromAPI(min, max, search, mainAttribute, sort,).subscribe(async data => {
        if (event == 1) {
          this.departments = [];
        }
        for (let i = 0; i < data.data.length; i++) {
          let department = new Department();
          department.id = data.data[i].id;
          await this.getEmployeeByIdDepartment(department.id!).subscribe(dataGetEmployee => {
            if (dataGetEmployee.message == 'Not Found Departmant') {
              department.member = 0;
            } else {
              department.member = dataGetEmployee.data.length;
            }
          });
          department.location = data.data[i].location;
          department.name = data.data[i].name;
          this.departments.push(department);
        }
        if (data.data.length < max || data.data.length == 0) {
          this.isOutOfData = true;
        }
        this.isLoadData = false;
      })
    }, 1000);
  }

  public getListDepartmentFromAPI(
    min: number,
    max: number,
    search: string,
    mainAttribute: string,
    sort: string) {
    const url = `${environment.REST_API}department/part?min=${min}&max=${max}&sort=${sort}&search=${search}&mainAttribute=${mainAttribute}`;
    return this.httpClient.get<any>(url);
  }

  public getEmployeeByIdDepartment(id: number) {
    const url = `${environment.REST_API}employee/department/${id}`;
    return this.httpClient.get<any>(url);
  }

  public saveItem() {
    if (this.editName.trim().length > 0) {
      this.saveDepartment().subscribe(data => {
        console.log(data);
        this.hiddenEditDepartment();
        this.loadData(0);
        this.isShowPopupRequest = false;
        this.isShowNotification = true;
        this.notificationService.titlePopUpNotificationDepartment = "Success";
        this.notificationService.childPopUpNotificationDepartment = `You have successfully updated the department #${this.editId}`;
      })
    }
  }

  public addNewDepartment(body: object) {
    const url = `${environment.REST_API}department`;
    return this.httpClient.post<any>(url, body);
  }

  public saveDepartment() {
    const url = `${environment.REST_API}department`;
    let body = {
      id: this.editId,
      name: this.editName,
      location: this.editLocation
    }
    return this.httpClient.put<any>(url, body);
  }

  public deleteDepartmentById(id: number) {
    const url = `${environment.REST_API}department/${id}`;
    return this.httpClient.delete<any>(url);
  }

  public isShowEditDepartment(): boolean {
    return this.isEditDepartment;
  }

  public showEditDepartment(): void {
    this.isEditDepartment = true;
  }

  public hiddenEditDepartment(): void {
    this.isEditDepartment = false;
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
