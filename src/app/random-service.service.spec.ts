import { TestBed } from '@angular/core/testing';

import { RandomServiceService } from './random-service.service';

describe('RandomServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomServiceService = TestBed.get(RandomServiceService);
    expect(service).toBeTruthy();
  });
});
