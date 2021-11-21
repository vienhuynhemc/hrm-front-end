import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../service/notification/notification.service";

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.scss']
})
export class DepartmentPageComponent implements OnInit {

  constructor(
    public notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.notifications = [];
  }

}
