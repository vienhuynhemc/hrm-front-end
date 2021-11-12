import {NotificationService} from '../../../../service/notification/notification.service';
import {EmployeePageService} from '../../../../service/main-page/employee-page/employee-page.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  public ids: string[] = [];

  constructor(
    public employeePageService: EmployeePageService,
    public notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.employeePageService.getAllIdDepartment().subscribe(data => {
      for (let i = 0; i < data.data.length; i++) {
        this.ids.push(data.data[i].id);
      }
    })
  }

  public requestSaveEmployee() {
    this.notificationService.titlePopUpYesNoEmployee = "Update employee";
    this.notificationService.childPopUpYesNoEmployee = `Are you sure you want to update employee
    #${this.employeePageService.editId}`
    this.employeePageService.isShowPopupRequest = true;
  }

  public back(): void {
    this.employeePageService.isEditEmployee = false;
  }

}
