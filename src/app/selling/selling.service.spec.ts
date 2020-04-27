import { TestBed } from '@angular/core/testing';

import { SellingService } from './selling.service';

describe('SellingService', () => {
  let service: SellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
