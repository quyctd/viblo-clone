import { TestBed } from '@angular/core/testing';

import { PostManageService } from './post-manage.service';

describe('PostManageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostManageService = TestBed.get(PostManageService);
    expect(service).toBeTruthy();
  });
});
