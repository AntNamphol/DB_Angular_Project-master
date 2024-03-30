import { TestBed } from '@angular/core/testing';

import { LoadMapService } from './load-map.service';

describe('LoadMapService', () => {
  let service: LoadMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
