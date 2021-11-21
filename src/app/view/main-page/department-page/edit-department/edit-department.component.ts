import {NotificationService} from '../../../../service/notification/notification.service';
import {DepartmentPageService} from '../../../../service/main-page/department-page/department-page.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  public enteredName: boolean = false;

  constructor(
    public departmentPageService: DepartmentPageService,
    public notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  public enteredNameFirst() {
    if (!this.enteredName) {
      this.enteredName = true;
    }
  }

  public back(): void {
    this.departmentPageService.isEditDepartment = false;
  }

  public requestSaveDepartment() {
    if (this.departmentPageService.form.valid) {
      this.notificationService.titlePopUpYesNoDepartment = "Update department";
      this.notificationService.childPopUpYesNoDepartment = `Are you sure you want to update department
    #${this.departmentPageService.editId}?`
      this.departmentPageService.isShowPopupRequest = true;
    }
  }

}
