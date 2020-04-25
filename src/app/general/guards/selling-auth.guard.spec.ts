import { TestBed } from '@angular/core/testing';

import { SellingAuthGuard } from './selling-auth.guard';

describe('SellingAuthGuard', () => {
  let guard: SellingAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SellingAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
