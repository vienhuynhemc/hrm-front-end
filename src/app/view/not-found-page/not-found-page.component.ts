import { Component, OnInit } from '@angular/core';
// lottie
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})


export class NotFoundPageComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/json/lottie/404-not-found.json',
  };

  constructor() { }

  ngOnInit(): void {
  }

}
