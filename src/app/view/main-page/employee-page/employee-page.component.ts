import { MainPageService } from 'src/app/service/main-page/main-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnInit {

  constructor(
    private mainPageService: MainPageService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.mainPageService.resetSelect();
      this.mainPageService.selectEmployeePage();
    }, 0);
  }

}
