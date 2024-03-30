import { TestBed } from '@angular/core/testing';

import { ExcelPoService } from './excel-po.service';

describe('ExcelPoService', () => {
  let service: ExcelPoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelPoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
