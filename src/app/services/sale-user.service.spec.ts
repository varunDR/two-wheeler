import { TestBed, inject } from '@angular/core/testing';

import { SaleUserService } from './sale-user.service';

describe('SaleUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleUserService]
    });
  });

  it('should be created', inject([SaleUserService], (service: SaleUserService) => {
    expect(service).toBeTruthy();
  }));
});
