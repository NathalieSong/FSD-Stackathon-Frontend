import { TestBed } from '@angular/core/testing';

import { ManagementAuthGuard } from './management-auth.guard';

describe('ManagementAuthGuard', () => {
  let guard: ManagementAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ManagementAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
