import {Component, HostListener, OnInit} from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {Employee} from 'src/app/model/employee';
import {EmployeePageService} from '../../../../service/main-page/employee-page/employee-page.service';
import {NotificationService} from '../../../../service/notification/notification.service';

@Component({
  selector: 'app-show-employee',
  templateUrl: './show-employee.component.html',
  styleUrls: ['./show-employee.component.scss']
})
export class ShowEmployeeComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };

  constructor(
    public employeePageService: EmployeePageService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.employeePageService.isLoadData = false;
    this.employeePageService.isOutOfData = false;
    this.employeePageService.employees = [];
    this.employeePageService.loadData(0);
  }

  public changeSearch() {
    this.employeePageService.loadData(1);
  }

  public onChangeSelect() {
    this.employeePageService.loadData(0);
  }

  public changeSort(sort: string) {
    this.employeePageService.sortString = sort;
    this.employeePageService.loadData(0);
  }

  public hiddenNotification(): void {
    this.employeePageService.isShowNotification = false;
  }

  @HostListener('scroll', ['$event']) // for scroll events of the current element
  onScroll() {
    let scrollTop = document.getElementById("content-list-e")!.scrollTop;
    let offsetHeight = document.getElementById("content-list-e")!.offsetHeight;
    let scrollHeight = document.getElementById("content-list-e")!.scrollHeight;
    if (!this.employeePageService.isLoadData && !this.employeePageService.isOutOfData) {
      if (scrollTop + offsetHeight > scrollHeight) {
        this.employeePageService.getListEmployee(
          Math.ceil(this.employeePageService.employees.length / 5),
          5,
          this.employeePageService.inputSearch,
          this.employeePageService.getStringMainAttribute(),
          this.employeePageService.sortString == "ASC" ? "asc" : "desc",
          0
        )
      }
    }
  }

  public requestRemoveItem(id: number): void {
    this.employeePageService.idEmployeeNeedRemove = id;
    this.notificationService.titlePopUpYesNoEmployee = "Delete employee";
    this.notificationService.childPopUpYesNoEmployee = `Are you sure you want to delete employee
    #${this.employeePageService.idEmployeeNeedRemove}`
    this.employeePageService.isShowPopupRequest = true;
    this.employeePageService.isProcessRemove = true;
  }

  public hiddenPopup(): void {
    this.employeePageService.isShowPopupRequest = false;
    this.employeePageService.isProcessRemove = false;
  }

  public removeItem(): void {
    this.employeePageService.deleteEmployeeById(this.employeePageService.idEmployeeNeedRemove).subscribe(data => {
      console.log(data);
      this.employeePageService.loadData(0);
      this.employeePageService.isShowPopupRequest = false;
      this.employeePageService.isProcessRemove = false;
      this.employeePageService.isShowNotification = true;
      this.notificationService.titlePopUpNotificationEmployee = "Success";
      this.notificationService.childPopUpNotificationEmployee = `You have successfully deleted the employee #${this.employeePageService.idEmployeeNeedRemove}`;
    });
  }

  public editItem(item: Employee) {
    this.employeePageService.isEditEmployee =true;
    this.employeePageService.editFirstName = item.firstName!;
    this.employeePageService.editLastName = item.lastName!;
    this.employeePageService.editGender = item.gender!;
    this.employeePageService.editAddress = item.address!;
    this.employeePageService.editEmail = item.email!;
    this.employeePageService.editId = item.id!;
    this.employeePageService.editDepartmentId = item.department?.id!;
    this.employeePageService.editCity = item.city!;
    let month = item.doB?.month! < 10 ? "0" + item.doB?.month : item.doB?.month;
    let day = item.doB?.day! < 10 ? "0" + item.doB?.day : item.doB?.day;
    this.employeePageService.editDoB = `${item.doB?.year}-${month}-${day}T00:00`;
  }

}
