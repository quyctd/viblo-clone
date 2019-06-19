import { TestBed } from '@angular/core/testing';

import { PublishService } from './publish.service';

describe('PublishService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishService = TestBed.get(PublishService);
    expect(service).toBeTruthy();
  });
});
