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
    public mainPageService: MainPageService
  ) {
  }

  ngOnInit(): void {
  }

}
