import { MainPageService } from 'src/app/service/main-page/main-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.scss']
})
export class DepartmentPageComponent implements OnInit {

  constructor(
    private mainPageService: MainPageService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.mainPageService.resetSelect();
      this.mainPageService.selectDepartmentPage();
    }, 0);
  }

}
