import {NotificationService} from '../../notification/notification.service';
import {environment} from '../../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Department} from 'src/app/model/department';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class DepartmentPageService {

  public isEditDepartment: boolean = false;
  public inputSearch: string = "";
  public sortString: string = "ASC"
  public mainAttribute: string = "Name"
  public mainAttributes: string[] = [
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

  public editId: number = 0;

  public idDepartmentNeedRemove: number = 0;
  public isShowPopupRequest: boolean = false;
  public isProcessRemove: boolean = false;
  public form: FormGroup = this.formBuilder.group(
    {
      editName: ['', [Validators.required]],
      editLocation: [''],
    }
  )

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private notificationService: NotificationService
  ) {
  }

  public loadData(event: number) {
    this.isOutOfData = false;
    this.departments = [];
    this.getListDepartment(
      0,
      25,
      this.inputSearch,
      this.mainAttribute == "Name" ? "name" : "location",
      this.sortString == "ASC" ? "asc" : "desc",
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
          await this.getEmployeeByIdDepartment(data.data[i].id).subscribe(dataGetEmployee => {
            let member = 0;
            if (dataGetEmployee.message != 'Not Found Departmant') {
              member = dataGetEmployee.data.length;
            }
            let department: Department = {
              id: data.data[i].id,
              location: data.data[i].location,
              member: member,
              name: data.data[i].name,
            }
            this.departments.push(department);
          });
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
    if (this.form.valid) {
      this.saveDepartment().subscribe(data => {
        console.log(data);
        this.isEditDepartment = false;
        this.loadData(0);
        this.isShowPopupRequest = false;
        this.notificationService.addNotification(`You have successfully updated the department #${this.editId}!`)
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
      name: this.form.value.editName,
      location: this.form.value.editLocation
    }
    return this.httpClient.put<any>(url, body);
  }

  public deleteDepartmentById(id: number) {
    const url = `${environment.REST_API}department/${id}`;
    return this.httpClient.delete<any>(url);
  }

}
