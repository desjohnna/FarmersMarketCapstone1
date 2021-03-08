import { TestBed } from '@angular/core/testing';

import { produceItemService } from './produceItem.service';

describe('CartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: produceItemService = TestBed.get(produceItemService);
    expect(service).toBeTruthy();
  });
});
