import { TestBed, inject } from '@angular/core/testing';

import { SetupServiceService } from './setup-service.service';

describe('SetupServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetupServiceService]
    });
  });

  it('should be created', inject([SetupServiceService], (service: SetupServiceService) => {
    expect(service).toBeTruthy();
  }));
});
