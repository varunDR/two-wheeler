import { TestBed, inject } from '@angular/core/testing';

import { AllVehicleService } from './all-vehicle.service';

describe('AllVehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllVehicleService]
    });
  });

  it('should be created', inject([AllVehicleService], (service: AllVehicleService) => {
    expect(service).toBeTruthy();
  }));
});
