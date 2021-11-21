import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../../service/notification/notification.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(
    public notificationService:NotificationService
  ) { }

  ngOnInit(): void {
  }

}
