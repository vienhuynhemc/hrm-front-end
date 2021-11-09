import { Date } from 'src/app/model/date';
import { EmployeePageService } from './../../../../service/main-page/employee-page/employee-page.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

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
    public employeePageService: EmployeePageService
  ) { }

  ngOnInit(): void {
    this.employeePageService.isLoadData = false;
    this.employeePageService.isOutOfData = false;
    this.employeePageService.employees = [];
    this.employeePageService.loadData(0);
  }

  public changeSearch(value: string) {
    this.employeePageService.loadData(1);
  }

  public onChangeSelect(event:any){
    this.employeePageService.loadData(0);
  }

  public changeSort(sort: string) {
    this.employeePageService.changeSort(sort);
    this.employeePageService.loadData(0);
  }

  animationCreated(animationItem: AnimationItem): void {
  }


  @HostListener('scroll', ['$event']) // for scroll events of the current element
  onScroll(event: Event) {
    var scrollTop = document.getElementById("content-list-e")!.scrollTop;
    var offsetHeight = document.getElementById("content-list-e")!.offsetHeight;
    var scrollHeight = document.getElementById("content-list-e")!.scrollHeight;
    if (!this.employeePageService.isLoadData && !this.employeePageService.isOutOfData) {
      if (scrollTop + offsetHeight > scrollHeight) {
        this.employeePageService.getListEmployee(
          Math.ceil(this.employeePageService.employees.length / 5),
          5,
          this.employeePageService.inputSearch,
          this.employeePageService.getStringMainAttribute(),
          this.employeePageService.getSortString() == "ASC" ? "asc" : "desc",
          0
        )
      }
    }
  }

  public removeItem(id: number) {
    this.employeePageService.deleteEmployeeById(id).subscribe(data => {
      console.log(data);
    });
    this.employeePageService.loadData(0);
  }

  public editItem(item: Employee) {
    this.employeePageService.showEditEmployee();
    this.employeePageService.editFirstName = item.firstName!;
    this.employeePageService.editLastName = item.lastName!;
    this.employeePageService.editGender = item.gender!;
    this.employeePageService.editAddress = item.address!;
    this.employeePageService.editEmail = item.email!;
    this.employeePageService.editId = item.id!;
    this.employeePageService.editDepartmentId = item.department?.id!;
    this.employeePageService.editCity = item.city!;
    let date = new Date();
    date.year = item.doB?.year;
    date.month = item.doB?.month;
    date.day = item.doB?.day;
    this.employeePageService.editDoB = date;
  }

}
