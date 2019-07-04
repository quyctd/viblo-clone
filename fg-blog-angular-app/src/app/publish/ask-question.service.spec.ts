import { TestBed } from '@angular/core/testing';

import { AskQuestionService } from './ask-question.service';

describe('AskQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AskQuestionService = TestBed.get(AskQuestionService);
    expect(service).toBeTruthy();
  });
});
