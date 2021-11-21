import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../service/notification/notification.service";

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnInit {

  constructor(
    public notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.notifications = [];
  }

}
