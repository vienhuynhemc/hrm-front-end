import {TestBed} from '@angular/core/testing';

import {EmployeePageService} from './employee-page.service';

describe('EmployeePageService', () => {
  let service: EmployeePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
