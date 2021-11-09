import { EmployeePageService } from './../../../../service/main-page/employee-page/employee-page.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  constructor(
    public employeePageService: EmployeePageService
  ) { }

  ngOnInit(): void {
  }

}
