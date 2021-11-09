import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainPageService } from 'src/app/service/main-page/main-page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public mainPageService:MainPageService
  ) {
  }

  ngOnInit(): void {
  }

  ///////////////////////////////////////
  // Các hàm di chuyển trang
  moveToDepartmentPage(): void {
    this.router.navigate(['department'], { relativeTo: this.route });
  }
  moveToEmployeePage(): void {
    this.router.navigate(['employee'], { relativeTo: this.route });
  }
  //////////////////////////////////////////
  
}
