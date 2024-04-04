import { TestBed } from '@angular/core/testing';

import { PickInReportService } from './pick-in-report.service';

describe('PickInReportService', () => {
  let service: PickInReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PickInReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
