import { TestBed, inject } from '@angular/core/testing';

import { VehicleDetailService } from './vehicle-detail.service';

describe('VehicleDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleDetailService]
    });
  });

  it('should be created', inject([VehicleDetailService], (service: VehicleDetailService) => {
    expect(service).toBeTruthy();
  }));
});
