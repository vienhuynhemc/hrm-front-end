import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainPageService {


  private isSelectDepartmentPage: boolean = false;
  private isSelectEmployeePage: boolean = false;

  constructor() { }

  public selectDepartmentPage(): void {
    this.isSelectDepartmentPage = true;
  }

  public isShowSelectDepartmentPage():boolean{
    return this.isSelectDepartmentPage;
  }

  public isShowSelectEmployeePage():boolean{
    return this.isSelectEmployeePage;
  }

  public selectEmployeePage(): void {
    this.isSelectEmployeePage = true;
  }

  public resetSelect(): void {
    this.isSelectDepartmentPage = false;
    this.isSelectEmployeePage = false;
  }


}
