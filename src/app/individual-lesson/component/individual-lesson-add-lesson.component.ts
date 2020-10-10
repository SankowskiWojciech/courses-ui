import { Component, OnInit } from '@angular/core';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { StudentFormModel } from '../model/student-form-model.model';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/individual-lesson.state';
import { getStudentsAvailableForTutor, getIndividualLessons } from '../state/individual-lesson.selector';
import * as IndividualLessonActions from '../state/individual-lesson.action';
import { studentValidator, lessonCollisionValidator, lessonDatesValidator } from '../validator/individual-lesson-new-lessons.validator';
import { IndividualLesson } from '../model/individual-lesson.model';
import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from '../constants/add-lesson-form-input-max-length.constant';
import { TranslateService } from '@ngx-translate/core';
import { transformStudentToStudentFormModule } from '../transformer/student-to-student-form-model.transformer';
import { ValidationMessages } from '../model/validation-messages.model';
import { transformAddIndividualLessonFormToIndividualLessonRequestBody } from '../transformer/add-individual-lesson-form-to-individual-lesson-request-body.transformer';

@Component({
  selector: 'courses-individual-lesson-add-lesson',
  templateUrl: './individual-lesson-add-lesson.component.html',
  styleUrls: ['./individual-lesson-add-lesson.component.scss']
})
export class IndividualLessonAddLessonComponent implements OnInit {

  readonly TITLE_MAX_LENGTH = TITLE_MAX_LENGTH;
  readonly DESCRIPTION_MAX_LENGTH = DESCRIPTION_MAX_LENGTH;

  addIndividualLessonForm: FormGroup;
  availableStudents: StudentFormModel[];
  filteredAvailableStudents: Observable<StudentFormModel[]>;
  individualLessons: IndividualLesson[];
  validationMessages = this.initializeValidationMessages();

  private ngDestroyed$ = new Subject();
  private readonly TRANSLATION_KEY_PREFIX_FOR_VALIDATION_MESSAGES = 'lessons.formValidationErrorMessages.';

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private router: Router,
              private route: ActivatedRoute, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.store.select(getIndividualLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(individualLessons => this.individualLessons = individualLessons);
    this.availableStudents = this.prepareStudentsAvailableForTutor();
    this.addIndividualLessonForm = this.initializeAddIndividualLessonForm();
    this.filteredAvailableStudents = this.addIndividualLessonForm.get('student').valueChanges.pipe(
      startWith(''),
      map(userInputValue => this.filterAvailableStudents(userInputValue))
    );
  }

  private filterAvailableStudents(userInputValue: string): StudentFormModel[] {
    const filterValue = userInputValue.toLowerCase();
    return this.availableStudents.filter(availableStudent => availableStudent.fullNameWithEmailAddress.toLowerCase().includes(filterValue));
  }

  private initializeAddIndividualLessonForm(): FormGroup {
    const titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(this.TITLE_MAX_LENGTH)]);
    titleFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.titleValidationMessage = this.getValidationMessage(titleFormControl)
    );
    const studentFormControl = new FormControl('', [Validators.required, studentValidator(this.availableStudents)]);
    studentFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.studentValidationMessage = this.getValidationMessage(studentFormControl)
    );
    const descriptionFormControl = new FormControl('', Validators.maxLength(this.DESCRIPTION_MAX_LENGTH));
    descriptionFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.descriptionValidationMessage = this.getValidationMessage(descriptionFormControl)
    );
    const lessonStartDateFormControl = new FormControl('', Validators.required);
    lessonStartDateFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.lessonStartDateValidationMessage = this.getValidationMessage(lessonStartDateFormControl)
    );
    const lessonEndDateFormControl = new FormControl('', Validators.required);
    lessonEndDateFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.lessonEndDateValidationMessage = this.getValidationMessage(lessonEndDateFormControl)
    );
    const lessonDatesFormGroup = new FormGroup({
      lessonStartDate: lessonStartDateFormControl,
      lessonEndDate: lessonEndDateFormControl
    }, [lessonDatesValidator, lessonCollisionValidator(this.individualLessons)]);
    lessonDatesFormGroup.valueChanges.subscribe(
      inputValue => this.validationMessages.lessonDatesValidationMessage = this.getValidationMessage(lessonDatesFormGroup)
    );
    const addIndividualLessonForm = this.formBuilder.group({
      title: titleFormControl,
      lessonDates: lessonDatesFormGroup,
      student: studentFormControl,
      description: descriptionFormControl
    });
    return addIndividualLessonForm;
  }

  private initializeValidationMessages(): ValidationMessages {
    return {
      titleValidationMessage: null,
      lessonDatesValidationMessage: null,
      lessonStartDateValidationMessage: null,
      lessonEndDateValidationMessage: null,
      studentValidationMessage: null,
      descriptionValidationMessage: null,
      lessonTimesValidation: null,
      weekdaysWithTimeRangesValidationMessage: null,
      lessonsTitlesValidationMessage: null,
      lessonsDurationValidationMessage: null
    };
  }

  private getValidationMessage(control: AbstractControl): Observable<string> {
    if ((control.touched || control.dirty) && control.errors) {
      return this.translateService.get(`${this.TRANSLATION_KEY_PREFIX_FOR_VALIDATION_MESSAGES}${Object.keys(control.errors)[0]}`);
    }
    return null;
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

  saveIndividualLesson() {
    const individualLessonRequestBody: IndividualLessonRequestBody = transformAddIndividualLessonFormToIndividualLessonRequestBody(this.addIndividualLessonForm, this.availableStudents);
    this.store.dispatch(IndividualLessonActions.createNewIndividualLesson({ individualLessonRequestBody }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
