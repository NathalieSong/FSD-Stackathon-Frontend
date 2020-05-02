import { TestBed } from '@angular/core/testing';

import { SellingService } from './selling.service';
import { HttpClientModule } from '@angular/common/http';

describe('SellingService', () => {
  let service: SellingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(SellingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
