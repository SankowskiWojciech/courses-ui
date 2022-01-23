import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { StudentFormModel } from '../model/student-form-model.model';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State as IndividualLessonState } from '../state/individual-lesson.state';
import { State as FileState } from '../../file/state/file.state';
import { getStudentsAvailableForTutor, getIndividualLessons } from '../state/individual-lesson.selector';
import * as IndividualLessonActions from '../state/individual-lesson.action';
import * as FileActions from '../../file/state/file.action';
import { studentValidator, lessonCollisionValidator, lessonDatesValidator } from '../validator/individual-lesson-new-lessons.validator';
import { IndividualLesson } from '../model/individual-lesson.model';
import { TITLE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH } from '../constants/add-lesson-form-input-max-length.constant';
import { TranslateService } from '@ngx-translate/core';
import { transformStudentToStudentFormModule } from '../transformer/student-to-student-form-model.transformer';
import { ValidationMessages } from '../model/validation-messages.model';
import { transformAddIndividualLessonFormToIndividualLessonRequestBody } from '../transformer/add-individual-lesson-form-to-individual-lesson-request-body.transformer';
import { FileInformation } from 'src/app/file/model/file-information.model';
import { getFilesInformation } from 'src/app/file/state/file.selector';

@Component({
  selector: 'courses-individual-lesson-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent implements OnInit, OnDestroy {

  readonly TITLE_MAX_LENGTH = TITLE_MAX_LENGTH;
  readonly DESCRIPTION_MAX_LENGTH = DESCRIPTION_MAX_LENGTH;

  addIndividualLessonForm: FormGroup;
  availableStudents: StudentFormModel[];
  filteredAvailableStudents: Observable<StudentFormModel[]>;
  filesInformation: FileInformation[];
  individualLessons: IndividualLesson[];
  validationMessages = this.initializeValidationMessages();

  private ngDestroyed$ = new Subject();
  private readonly TRANSLATION_KEY_PREFIX_FOR_VALIDATION_MESSAGES = 'lessons.formValidationErrorMessages.';

  constructor(private formBuilder: FormBuilder, private individualLessonStore: Store<IndividualLessonState>, private router: Router,
    private route: ActivatedRoute, private translateService: TranslateService,
    private fileStore: Store<FileState>) { }

  ngOnInit(): void {
    this.individualLessonStore.dispatch(IndividualLessonActions.loadIndividualLessons());
    this.individualLessonStore.dispatch(IndividualLessonActions.loadStudentsAvailableForTutor());
    this.fileStore.dispatch(FileActions.loadFilesInformation());
    this.individualLessonStore.select(getIndividualLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(individualLessons => this.individualLessons = individualLessons);
    this.availableStudents = this.prepareStudentsAvailableForTutor();
    this.fileStore.select(getFilesInformation)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(filesInformation => {
        this.filesInformation = filesInformation;
      });
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
      () => this.validationMessages.titleValidationMessage = this.getValidationMessage(titleFormControl)
    );
    const studentFormControl = new FormControl('', [Validators.required, studentValidator(this.availableStudents)]);
    studentFormControl.valueChanges.subscribe(
      () => this.validationMessages.studentValidationMessage = this.getValidationMessage(studentFormControl)
    );
    const descriptionFormControl = new FormControl('', Validators.maxLength(this.DESCRIPTION_MAX_LENGTH));
    descriptionFormControl.valueChanges.subscribe(
      () => this.validationMessages.descriptionValidationMessage = this.getValidationMessage(descriptionFormControl)
    );
    const lessonStartDateFormControl = new FormControl('', Validators.required);
    lessonStartDateFormControl.valueChanges.subscribe(
      () => this.validationMessages.lessonStartDateValidationMessage = this.getValidationMessage(lessonStartDateFormControl)
    );
    const lessonEndDateFormControl = new FormControl('', Validators.required);
    lessonEndDateFormControl.valueChanges.subscribe(
      () => this.validationMessages.lessonEndDateValidationMessage = this.getValidationMessage(lessonEndDateFormControl)
    );
    const lessonDatesFormGroup = new FormGroup({
      lessonStartDate: lessonStartDateFormControl,
      lessonEndDate: lessonEndDateFormControl
    }, [lessonDatesValidator, lessonCollisionValidator(this.individualLessons)]);
    lessonDatesFormGroup.valueChanges.subscribe(
      () => this.validationMessages.lessonDatesValidationMessage = this.getValidationMessage(lessonDatesFormGroup)
    );
    const addIndividualLessonForm = this.formBuilder.group({
      title: titleFormControl,
      lessonDates: lessonDatesFormGroup,
      student: studentFormControl,
      description: descriptionFormControl,
      files: new FormControl()
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
    this.individualLessonStore.select(getStudentsAvailableForTutor)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(studentsAvailableForTutor => {
        studentsAvailableForTutor.forEach(
          student => availableStudents.push(transformStudentToStudentFormModule(student)));
      });
    return availableStudents;
  }

  sortFilesAlphabetically() {
    this.filesInformation = [...this.filesInformation].sort((file1, file2) => file1.name.localeCompare(file2.name));
  }

  saveIndividualLesson() {
    const individualLessonRequestBody: IndividualLessonRequestBody = transformAddIndividualLessonFormToIndividualLessonRequestBody(this.addIndividualLessonForm, this.availableStudents);
    this.individualLessonStore.dispatch(IndividualLessonActions.createNewIndividualLesson({ individualLessonRequestBody }));
  }

  ngOnDestroy(): void {
      this.ngDestroyed$.next();
      this.ngDestroyed$.complete();
  }
}
