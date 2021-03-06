import {NotificationService} from '../../../../service/notification/notification.service';
import {Component, HostListener, OnInit} from '@angular/core';
import {DepartmentPageService} from 'src/app/service/main-page/department-page/department-page.service';
// lottie
import {AnimationOptions} from 'ngx-lottie';
import {Department} from 'src/app/model/department';

@Component({
  selector: 'app-show-department',
  templateUrl: './show-department.component.html',
  styleUrls: ['./show-department.component.scss']
})
export class ShowDepartmentComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/json/lottie/loading.json',
  };

  constructor(
    public departmentPageService: DepartmentPageService,
    public notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.departmentPageService.isLoadData = false;
    this.departmentPageService.isOutOfData = false;
    this.departmentPageService.departments = [];
    this.departmentPageService.loadData(0);
  }

  public changeSearch() {
    this.departmentPageService.loadData(1);
  }

  public changeSort(sort: string) {
    this.departmentPageService.sortString = sort;
    this.departmentPageService.loadData(0);
  }

  public editItem(item: Department) {
    this.departmentPageService.isEditDepartment = true;
    this.departmentPageService.form.patchValue({
      editName: item.name,
      editLocation: item.location,
    });
    this.departmentPageService.editId = item.id!;
  }

  @HostListener('scroll', ['$event']) // for scroll events of the current element
  onScroll() {
    let scrollTop = document.getElementById("content-list")!.scrollTop;
    let offsetHeight = document.getElementById("content-list")!.offsetHeight;
    let scrollHeight = document.getElementById("content-list")!.scrollHeight;
    if (!this.departmentPageService.isLoadData && !this.departmentPageService.isOutOfData) {
      if (scrollTop + offsetHeight > scrollHeight) {
        this.departmentPageService.getListDepartment(
          Math.ceil(this.departmentPageService.departments.length / 5),
          5,
          this.departmentPageService.inputSearch,
          this.departmentPageService.mainAttribute == "Name" ? "name" : "location",
          this.departmentPageService.sortString == "ASC" ? "asc" : "desc",
          0
        )
      }
    }
  }

  public requestRemoveItem(id: number): void {
    this.departmentPageService.idDepartmentNeedRemove = id;
    this.notificationService.titlePopUpYesNoDepartment = "Delete department";
    this.notificationService.childPopUpYesNoDepartment = `Are you sure you want to delete department
    #${this.departmentPageService.idDepartmentNeedRemove}?`
    this.departmentPageService.isShowPopupRequest = true;
    this.departmentPageService.isProcessRemove = true;
  }

  public hiddenPopup(): void {
    this.departmentPageService.isShowPopupRequest = false;
    this.departmentPageService.isProcessRemove = false;
  }

  public removeItem() {
    this.departmentPageService.deleteDepartmentById(this.departmentPageService.idDepartmentNeedRemove).subscribe(data => {
      console.log(data);
      this.departmentPageService.loadData(0);
      this.departmentPageService.isShowPopupRequest = false;
      this.departmentPageService.isProcessRemove = false;
      this.notificationService.addNotification(`You have successfully deleted the department #${this.departmentPageService.idDepartmentNeedRemove}!`)
    });
  }

}
