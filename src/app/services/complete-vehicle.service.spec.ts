import { TestBed, inject } from '@angular/core/testing';

import { CompleteVehicleService } from './complete-vehicle.service';

describe('CompleteVehicleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompleteVehicleService]
    });
  });

  it('should be created', inject([CompleteVehicleService], (service: CompleteVehicleService) => {
    expect(service).toBeTruthy();
  }));
});
