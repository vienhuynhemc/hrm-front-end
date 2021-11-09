import { DepartmentPageService } from './../../../../service/main-page/department-page/department-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {

  constructor(
    public departmentPageService: DepartmentPageService
  ) { }

  ngOnInit(): void {
  }

  public saveDepartment(): void {
    if (this.departmentPageService.editName.trim().length > 0) {
      this.departmentPageService.saveDepartment().subscribe(data => {
        console.log(data);
        this.departmentPageService.hiddenEditDepartment();
        this.departmentPageService.loadData(0);
      })
    }
  }

  public back(): void {
    this.departmentPageService.hiddenEditDepartment();
  }

}
