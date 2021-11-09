import { TestBed } from '@angular/core/testing';

import { DepartmentPageService } from './department-page.service';

describe('DepartmentPageService', () => {
  let service: DepartmentPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
