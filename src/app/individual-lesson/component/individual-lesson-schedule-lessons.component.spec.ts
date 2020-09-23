import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLessonScheduleLessonsComponent } from './individual-lesson-schedule-lessons.component';

describe('IndividualLessonScheduleLessonsComponent', () => {
  let component: IndividualLessonScheduleLessonsComponent;
  let fixture: ComponentFixture<IndividualLessonScheduleLessonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualLessonScheduleLessonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualLessonScheduleLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
