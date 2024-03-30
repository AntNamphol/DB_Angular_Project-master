import { TestBed } from '@angular/core/testing';

import { DataLoaderPicinSuccService } from './data-loader-picin-succ.service';

describe('DataLoaderPicinSuccService', () => {
  let service: DataLoaderPicinSuccService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLoaderPicinSuccService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
