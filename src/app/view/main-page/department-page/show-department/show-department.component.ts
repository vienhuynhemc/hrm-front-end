import { Component, HostListener, OnInit } from '@angular/core';
import { DepartmentPageService } from 'src/app/service/main-page/department-page/department-page.service';
// lottie
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Department } from 'src/app/model/department';

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
  ) { }

  ngOnInit(): void {
    this.departmentPageService.isLoadData = false;
    this.departmentPageService.isOutOfData = false;
    this.departmentPageService.departments = [];
    this.departmentPageService.loadData(0);
  }



  public changeSearch(value: string) {
    this.departmentPageService.loadData(1);
  }

  public changeSort(sort: string) {
    this.departmentPageService.changeSort(sort);
    this.departmentPageService.loadData(0);
  }

  animationCreated(animationItem: AnimationItem): void {
  }

  public removeItem(id: number) {
    this.departmentPageService.deleteDepartmentById(id).subscribe(data => {
      console.log(data);
    });
    this.departmentPageService.loadData(0);
  }

  public editItem(item:Department){
      this.departmentPageService.showEditDepartment();
      this.departmentPageService.editName = item.name!;
      this.departmentPageService.editLocation = item.location!;
      this.departmentPageService.editId = item.id!;
  }

  @HostListener('scroll', ['$event']) // for scroll events of the current element
  onScroll(event: Event) {
    var scrollTop = document.getElementById("content-list")!.scrollTop;
    var offsetHeight = document.getElementById("content-list")!.offsetHeight;
    var scrollHeight = document.getElementById("content-list")!.scrollHeight;
    if (!this.departmentPageService.isLoadData && !this.departmentPageService.isOutOfData) {
      if (scrollTop + offsetHeight > scrollHeight) {
        this.departmentPageService.getListDepartment(
          Math.ceil(this.departmentPageService.departments.length / 5),
          5,
          this.departmentPageService.inputSearch,
          this.departmentPageService.mainAttribute == "Name" ? "name" : "location",
          this.departmentPageService.getSortString() == "ASC" ? "asc" : "desc",
          0
        )
      }
    }
  }

}
