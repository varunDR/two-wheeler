import { TestBed, inject } from '@angular/core/testing';

import { FooterServiceService } from './footer-service.service';

describe('FooterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FooterServiceService]
    });
  });

  it('should be created', inject([FooterServiceService], (service: FooterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
