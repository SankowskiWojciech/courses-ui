import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentFormModel } from '../model/student-form-model.model';

@Component({
  selector: 'courses-individual-lesson-schedule-lessons',
  templateUrl: './individual-lesson-schedule-lessons.component.html',
  styleUrls: ['./individual-lesson-schedule-lessons.component.scss']
})
export class IndividualLessonScheduleLessonsComponent implements OnInit {

  scheduleIndividualLessonsForm: FormGroup;
  availableStudents: StudentFormModel[];
  filteredAvailableStudents: Observable<StudentFormModel[]>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.scheduleIndividualLessonsForm = this.initializeScheduleIndividualLessonsForm();
  }

  initializeScheduleIndividualLessonsForm(): FormGroup {
    const scheduleTypeFormControl = new FormControl('');
    const scheduleIndividualLessonsForm = this.formBuilder.group({
      scheduleType: scheduleTypeFormControl
    });
    return scheduleIndividualLessonsForm;
  }

  scheduleIndividualLessons() { }

}
