import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ScheduleTypes } from '../constants/schedule-types.constant';
import { Weekdays } from '../constants/weekdays.constant';
import { StudentFormModel } from '../model/student-form-model.model';
import { getStudentsAvailableForTutor } from '../state/individual-lesson.selector';
import { State } from '../state/individual-lesson.state';
import { transformStudentToStudentFormModule } from '../transformer/student-to-student-form-model.transformer';
import * as IndividualLessonActions from '../state/individual-lesson.action';
import { Subject } from 'rxjs/internal/Subject';
import { lessonsTitlesValidator, studentValidator, weekdaysFormGroupValidator, weekdayWithTimeRangesFormGroupValidator } from '../validator/individual-lesson-new-lessons.validator';
import { TITLE_MAX_LENGTH } from '../constants/add-lesson-form-input-max-length.constant';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'courses-individual-lesson-schedule-lessons',
  templateUrl: './individual-lesson-schedule-lessons.component.html',
  styleUrls: ['./individual-lesson-schedule-lessons.component.scss']
})
export class IndividualLessonScheduleLessonsComponent implements OnInit {

  showLessonsTitlesTextArea = true;
  showLessonsTitlesTable = false;
  scheduleIndividualLessonsForm: FormGroup;
  weekdayWithTimeRangesFormGroups: FormGroup[];

  availableStudents: StudentFormModel[];
  filteredAvailableStudents: Observable<StudentFormModel[]>;
  scheduleTypes = Object.keys(ScheduleTypes);
  weekdays = Object.keys(Weekdays);

  lessonsTitlesDataSource: MatTableDataSource<string>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  validationMessages = {
    lessonStartDateValidationMessage: null,
    studentValidationMessage: null,
    lessonTimesValidation: null,
    weekdaysWithTimeRangesValidationMessage: null,
    lessonsTitlesValidationMessage: null
  };

  readonly columnsToRender = ['ordinalNumber', 'lessonTitle'];
  readonly TITLE_MAX_LENGTH = TITLE_MAX_LENGTH;
  private ngDestroyed$ = new Subject();
  private readonly TRANSLATION_KEY_PREFIX = 'lessons.formValidationErrorMessages.';

  constructor(private formBuilder: FormBuilder, private translateService: TranslateService, private store: Store<State>) { }

  ngOnInit(): void {
    this.scheduleIndividualLessonsForm = this.initializeScheduleIndividualLessonsForm();
    this.availableStudents = this.prepareStudentsAvailableForTutor();
  }

  initializeScheduleIndividualLessonsForm(): FormGroup {
    const scheduleTypeFormControl = new FormControl('', Validators.required);
    const scheduleIndividualLessonsForm = this.formBuilder.group({
      scheduleType: scheduleTypeFormControl
    });

    scheduleTypeFormControl.valueChanges.subscribe(
      inputValue => this.initializeBasicForm(scheduleIndividualLessonsForm)
    );

    return scheduleIndividualLessonsForm;
  }

  private initializeBasicForm(scheduleIndividualLessonsForm: FormGroup) {
    const lessonStartDateFormControl = new FormControl('', Validators.required);
    lessonStartDateFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.lessonStartDateValidationMessage = this.getValidationMessage(lessonStartDateFormControl)
    );
    const studentFormControl = new FormControl('', [Validators.required, studentValidator(this.availableStudents)]);
    studentFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.studentValidationMessage = this.getValidationMessage(studentFormControl)
    );
    const lessonsTitlesFormControl = new FormControl('', lessonsTitlesValidator);
    lessonsTitlesFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.lessonsTitlesValidationMessage = this.getValidationMessage(lessonsTitlesFormControl)
    );
    scheduleIndividualLessonsForm.addControl('lessonStartDate', lessonStartDateFormControl);
    scheduleIndividualLessonsForm.addControl('weekdaysWithTimeRanges', this.initializeWeekdaysWithTimeRanges());
    scheduleIndividualLessonsForm.addControl('student', studentFormControl);
    scheduleIndividualLessonsForm.addControl('lessonsTitles', lessonsTitlesFormControl);
    this.filteredAvailableStudents = scheduleIndividualLessonsForm.get('student').valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.filterAvailableStudents(userInputValue))
    );
  }

  private initializeFormForScheduleTypeFixedDurationLessons(scheduleIndividualLessonsForm: FormGroup) {

  }

  private initializeFormForScheduleTypeFixedDatesLessons(scheduleIndividualLessonsForm: FormGroup) {

  }

  private initializeWeekdaysWithTimeRanges(): FormGroup {
    const weekdayWithTimeRangesFormGroups = this.weekdays.map(weekday => {
      const weekdayCheckboxFormControl = new FormControl('');
      const weekdayStartTimeFormControl = new FormControl('');
      const weekdayEndTimeFormControl = new FormControl('');
      const weekdayWithTimeRangesFormGroup = new FormGroup({
        [weekday]: weekdayCheckboxFormControl,
        [`${weekday}StartTime`]: weekdayStartTimeFormControl,
        [`${weekday}EndTime`]: weekdayEndTimeFormControl
      });
      weekdayCheckboxFormControl.valueChanges.subscribe(
        checkboxValue => {
          if (checkboxValue) {
            weekdayStartTimeFormControl.setValidators(Validators.required);
            weekdayEndTimeFormControl.setValidators(Validators.required);
            weekdayWithTimeRangesFormGroup.setValidators(weekdayWithTimeRangesFormGroupValidator(weekday));
          } else {
            weekdayWithTimeRangesFormGroup.get(`${weekday}StartTime`).setValue('');
            weekdayWithTimeRangesFormGroup.get(`${weekday}EndTime`).setValue('');
            weekdayWithTimeRangesFormGroup.clearValidators();
            weekdayStartTimeFormControl.clearValidators();
            weekdayEndTimeFormControl.clearValidators();
          }
        }
      );
      weekdayWithTimeRangesFormGroup.valueChanges.subscribe(inputValue =>
        this.validationMessages.lessonTimesValidation = this.getValidationMessage(weekdayWithTimeRangesFormGroup)
      );
      return weekdayWithTimeRangesFormGroup;
    });
    this.weekdayWithTimeRangesFormGroups = weekdayWithTimeRangesFormGroups;
    const weekdaysFormGroup = new FormGroup({}, weekdaysFormGroupValidator(this.weekdayWithTimeRangesFormGroups));
    this.weekdayWithTimeRangesFormGroups.forEach(weekdayWithTimeRangesFormGroup => weekdaysFormGroup.addControl(`${Object.keys(weekdayWithTimeRangesFormGroup.controls)[0]}FormGroup`, weekdayWithTimeRangesFormGroup));
    weekdaysFormGroup.valueChanges.subscribe(input =>
      this.validationMessages.weekdaysWithTimeRangesValidationMessage = this.getValidationMessage(weekdaysFormGroup)
    );
    return weekdaysFormGroup;
  }

  private getValidationMessage(control: AbstractControl): Observable<string> {
    if ((control.touched || control.dirty) && control.errors) {
      return this.translateService.get(`${this.TRANSLATION_KEY_PREFIX}${Object.keys(control.errors)[0]}`);
    }
    return null;
  }

  private filterAvailableStudents(userInputValue: string): StudentFormModel[] {
    const filterValue = userInputValue.toLowerCase();
    return this.availableStudents.filter(availableStudent => availableStudent.fullNameWithEmailAddress.toLowerCase().includes(filterValue));
  }

  private prepareStudentsAvailableForTutor(): StudentFormModel[] {
    const availableStudents: StudentFormModel[] = [];
    this.store.select(getStudentsAvailableForTutor)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(studentsAvailableForTutor => {
        if (!studentsAvailableForTutor.length) {
          this.store.dispatch(IndividualLessonActions.loadStudentsAvailableForTutor());
        }
        studentsAvailableForTutor.forEach(
          student => availableStudents.push(transformStudentToStudentFormModule(student)));
      });
    return availableStudents;
  }

  setLessonsTitles() {
    const lessonsTitlesInputValue: string = this.scheduleIndividualLessonsForm.get('lessonsTitles').value;
    const lessonsTitles = lessonsTitlesInputValue.trim().split('\n').filter(lessonTitle => lessonTitle.trim().length > 0);
    this.lessonsTitlesDataSource = new MatTableDataSource();
    this.lessonsTitlesDataSource.data = lessonsTitles;
    this.showLessonsTitlesTable = true;
    this.showLessonsTitlesTextArea = false;
    setTimeout(() => this.lessonsTitlesDataSource.paginator = this.paginator);
  }

  editLessonsTitles() {
    const lessonsTitlesWithoutEmptyLines = this.lessonsTitlesDataSource.data.join('\n');
    this.scheduleIndividualLessonsForm.get('lessonsTitles').setValue(lessonsTitlesWithoutEmptyLines);
    this.showLessonsTitlesTable = false;
    this.showLessonsTitlesTextArea = true;
  }

  scheduleIndividualLessons() { }

  isLessonTitleTooLong(lessonTitle: string): boolean {
    return lessonTitle.length > TITLE_MAX_LENGTH;
  }
}
