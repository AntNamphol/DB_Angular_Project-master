import { TestBed } from '@angular/core/testing';

import { TotalItemService } from './total-item.service';

describe('TotalItemService', () => {
  let service: TotalItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
