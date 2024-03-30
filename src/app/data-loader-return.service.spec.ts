import { TestBed } from '@angular/core/testing';

import { DataLoaderReturnService } from './data-loader-return.service';

describe('DataLoaderReturnService', () => {
  let service: DataLoaderReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataLoaderReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
