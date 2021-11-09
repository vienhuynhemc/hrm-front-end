import { NotificationService } from './../../../../service/notification/notification.service';
import { DepartmentPageService } from 'src/app/service/main-page/department-page/department-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  public location: string = "HOCHIMINH"
  public name: string = ""

  constructor(
    public departmentPageService: DepartmentPageService,
    public notificationService: NotificationService
  ) { }

  public addDepartment(): void {
    if (this.name.trim().length != 0) {
      let body = {
        name: this.name,
        location: this.location
      };
      this.departmentPageService.addNewDepartment(body).subscribe(data => {
        console.log(data);
        this.name = "";
        this.departmentPageService.loadData(0);
        this.departmentPageService.isShowNotification = true;
        this.notificationService.titlePopUpNotificationDepartment = "Success";
        this.notificationService.childPopUpNotificationDepartment = `You have successfully added the department #${data.data.id}`;
      });
    }
  }

  ngOnInit(): void {
  }

}
