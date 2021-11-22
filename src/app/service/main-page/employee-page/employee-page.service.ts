import {NotificationService} from '../../notification/notification.service';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../../../model/employee';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

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

    public editId: number = 0;
    public form: FormGroup = this.formBuilder.group(
        {
            editGender: ['',],
            editFirstName: ['', [Validators.required, this.validatorMinLengthFirstName, this.validatorMaxLengthFirstName]],
            editLastName: ['', [Validators.required]],
            editAddress: ['', [Validators.required]],
            editCity: ['', [Validators.required]],
            editEmail: ['', [Validators.required, Validators.email]],
            editDepartmentId: ['',],
            editDoB: ['',]
        }
    );

    public idEmployeeNeedRemove: number = 0;
    public isShowPopupRequest: boolean = false;
    public isProcessRemove: boolean = false;

    public isAddEmployee: boolean = false;

    constructor(
        private httpClient: HttpClient,
        private notificationService: NotificationService,
        private formBuilder: FormBuilder,
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

    public checkEmail(email: string, id: number) {
        const url = `${environment.REST_API}employee/find?email=${email}&id=${id}`;
        return this.httpClient.get<any>(url);
    }

    public saveItem() {
        if (this.form.valid) {
            this.saveEmployee().subscribe(data => {
                console.log(data);
                this.isShowPopupRequest = false;
                this.isEditEmployee = false;
                this.loadData(0);
                this.notificationService.addNotification(`You have successfully updated the employee #${this.editId}!`);
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
            address: this.form.value.editAddress,
            city: this.form.value.editCity,
            doB: this.form.value.editDoB.slice(0, 10),
            email: this.form.value.editEmail,
            firstName: this.form.value.editFirstName,
            lastName: this.form.value.editLastName,
            gender: this.form.value.editGender,
            department: parseInt(this.form.value.editDepartmentId),
        }
        return this.httpClient.put<any>(url, body);
    }

    public validatorMinLengthFirstName(c: AbstractControl) {
        let value = c.value.trim();
        return value.length < 5 ? {
            minLength: true
        } : null;
    }

    public validatorMaxLengthFirstName(c: AbstractControl) {
        let value = c.value.trim();
        return value.length > 50 ? {
            maxLength: true
        } : null;
    }

}
