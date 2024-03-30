import { TestBed } from '@angular/core/testing';

import { ExcelPicoutService } from './excel-picout.service';

describe('ExcelPicoutService', () => {
  let service: ExcelPicoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelPicoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
