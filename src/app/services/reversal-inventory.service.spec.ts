import { TestBed, inject } from '@angular/core/testing';

import { ReversalInventoryService } from './reversal-inventory.service';

describe('ReversalInventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReversalInventoryService]
    });
  });

  it('should be created', inject([ReversalInventoryService], (service: ReversalInventoryService) => {
    expect(service).toBeTruthy();
  }));
});
