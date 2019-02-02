import { TestBed, inject } from '@angular/core/testing';

import { InventoryAssigningService } from './inventory-assigning.service';

describe('InventoryAssigningService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryAssigningService]
    });
  });

  it('should be created', inject([InventoryAssigningService], (service: InventoryAssigningService) => {
    expect(service).toBeTruthy();
  }));
});
