import { TestBed } from '@angular/core/testing';

import { IndividualLessonService } from './individual-lesson.service';

describe('IndividualLessonService', () => {
  let service: IndividualLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
