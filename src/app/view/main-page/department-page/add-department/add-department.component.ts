import {NotificationService} from '../../../../service/notification/notification.service';
import {DepartmentPageService} from 'src/app/service/main-page/department-page/department-page.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  public form: FormGroup = this.formBuilder.group(
    {
      location: ['HOCHIMINH',],
      name: ['', [Validators.required]],
    }
  );

  public isShowNotification: boolean = false;

  public enteredName: boolean = false;

  constructor(
    public departmentPageService: DepartmentPageService,
    public notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
  }

  public enteredNameFirst(): void {
    if (!this.enteredName) {
      this.enteredName = true;
    }
  }

  public addDepartment(): void {
    this.enteredNameFirst();
    if (this.form.valid) {
      this.departmentPageService.addNewDepartment(this.form.value).subscribe(data => {
        console.log(data);
        this.form.patchValue({
          name: "",
        });
        this.enteredName = false;
        this.departmentPageService.loadData(0);
        this.isShowNotification = true;
        this.notificationService.titlePopUpNotificationDepartment = `You have successfully added the department #${data.data.id}!`;
      });
    }

  }

  ngOnInit(): void {
  }

}
