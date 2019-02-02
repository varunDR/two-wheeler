import { TestBed, inject } from '@angular/core/testing';

import { IndentService } from './indent.service';

describe('IndentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndentService]
    });
  });

  it('should be created', inject([IndentService], (service: IndentService) => {
    expect(service).toBeTruthy();
  }));
});
