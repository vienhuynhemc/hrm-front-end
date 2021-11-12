import {Injectable} from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public options: AnimationOptions = {
    path: '/assets/json/lottie/notification.json',
  };

  public titlePopUpYesNoDepartment: string = "";
  public childPopUpYesNoDepartment: string = "";
  public titlePopUpNotificationDepartment: string = "";
  public childPopUpNotificationDepartment: string = "";

  public titlePopUpYesNoEmployee: string = "";
  public childPopUpYesNoEmployee: string = "";
  public titlePopUpNotificationEmployee: string = "";
  public childPopUpNotificationEmployee: string = "";

  constructor() {
  }
}
