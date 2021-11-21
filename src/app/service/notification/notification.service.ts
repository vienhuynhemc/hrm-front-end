import {Injectable} from '@angular/core';
import {Notification} from "../../model/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public titlePopUpYesNoDepartment: string = "";
  public childPopUpYesNoDepartment: string = "";
  public titlePopUpNotificationDepartment: string = "";

  public titlePopUpYesNoEmployee: string = "";
  public childPopUpYesNoEmployee: string = "";
  public titlePopUpNotificationEmployee: string = "";

  public notifications: Notification[] = [];

  constructor() {
    this.update();
  }

  public update() {
    setTimeout(
      () => {
        if (this.notifications.length != 0) {
          this.notifications.pop();
        }
        this.update();
      },
      4000
    )
  }

  public addNotification(content: string) {
    this.notifications.unshift({
      id: this.notifications.length,
      content: content
    });
  }

}
