import { TestBed } from '@angular/core/testing';

import { NewestPostsService } from './newest-posts.service';

describe('NewestPostsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewestPostsService = TestBed.get(NewestPostsService);
    expect(service).toBeTruthy();
  });
});
