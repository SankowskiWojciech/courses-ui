import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLessonAddLessonComponent } from './individual-lesson-add-lesson.component';

describe('IndividualLessonAddLessonComponent', () => {
  let component: IndividualLessonAddLessonComponent;
  let fixture: ComponentFixture<IndividualLessonAddLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualLessonAddLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualLessonAddLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
