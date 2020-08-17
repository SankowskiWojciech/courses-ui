import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualLessonListComponent } from './individual-lesson-list.component';

describe('IndividualLessonListComponent', () => {
  let component: IndividualLessonListComponent;
  let fixture: ComponentFixture<IndividualLessonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualLessonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualLessonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
