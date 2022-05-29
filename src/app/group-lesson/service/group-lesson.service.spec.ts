import { TestBed } from '@angular/core/testing';

import { GroupLessonService } from './group-lesson.service';

describe('GroupLessonService', () => {
  let service: GroupLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
