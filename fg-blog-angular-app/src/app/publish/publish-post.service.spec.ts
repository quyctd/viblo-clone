import { TestBed } from '@angular/core/testing';

import { PublishPostService } from './publish-post.service';

describe('PublishPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublishPostService = TestBed.get(PublishPostService);
    expect(service).toBeTruthy();
  });
});
