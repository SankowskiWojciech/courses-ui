import { Component, OnInit } from '@angular/core';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { Observable, Subject } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { StudentFormModel } from '../model/student-form-model.model';
import { Student } from '../model/student.model';
import { ValidationMessages } from '../constants/validation-messages.constant';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/individual-lesson.state';
import { getStudentsAvailableForTutor } from '../state/individual-lesson.selector';
import * as IndividualLessonActions from '../state/individual-lesson.action';
import { studentValidator, startDateOfLessonValidator, endDateOfLessonValidator } from '../validator/individual-lesson-add-lesson.validator';

@Component({
  selector: 'courses-individual-lesson-add-lesson',
  templateUrl: './individual-lesson-add-lesson.component.html',
  styleUrls: ['./individual-lesson-add-lesson.component.scss']
})
export class IndividualLessonAddLessonComponent implements OnInit {

  addIndividualLessonForm: FormGroup;
  availableStudents: StudentFormModel[];
  filteredAvailableStudents: Observable<StudentFormModel[]>;

  validationMessages = {
    titleValidationMessage: null,
    startDateOfLessonsValidationMessage: null,
    endDateOfLessonsValidationMessage: null,
    studentValidationMessage: null,
    descriptionValidationMessage: null
  };

  private ngDestroyed$ = new Subject();

  constructor(private formBuilder: FormBuilder, private store: Store<State>, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
    const titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    titleFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.titleValidationMessage = this.getValidationMessage(titleFormControl)
    );
    const studentFormControl = new FormControl('', [Validators.required, studentValidator(this.availableStudents)]);
    studentFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.studentValidationMessage = this.getValidationMessage(studentFormControl)
    );
    const descriptionFormControl = new FormControl('', Validators.maxLength(2000));
    descriptionFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.descriptionValidationMessage = this.getValidationMessage(descriptionFormControl)
    );
    const startDateOfLessonFormControl = new FormControl('');
    const endDateOfLessonFormControl = new FormControl('');
    startDateOfLessonFormControl.setValidators([Validators.required, startDateOfLessonValidator(endDateOfLessonFormControl)]);
    startDateOfLessonFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.startDateOfLessonsValidationMessage = this.getValidationMessage(startDateOfLessonFormControl)
    );
    endDateOfLessonFormControl.setValidators([Validators.required, endDateOfLessonValidator(startDateOfLessonFormControl)]);
    endDateOfLessonFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.endDateOfLessonsValidationMessage = this.getValidationMessage(endDateOfLessonFormControl)
    );
    const addIndividualLessonForm = this.formBuilder.group({
      title: titleFormControl,
      startDateOfLesson: startDateOfLessonFormControl,
      endDateOfLesson: endDateOfLessonFormControl,
      student: studentFormControl,
      description: descriptionFormControl
    });
    return addIndividualLessonForm;
  }

  private getValidationMessage(control: AbstractControl): string {
    if ((control.touched || control.dirty) && control.errors) {
      return Object.keys(control.errors)
        .map(errorKey => ValidationMessages[errorKey])
        .join(' ');
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
          student => availableStudents.push(this.transformStudentToStudentFormModule(student)));
      });
    return availableStudents;
  }

  private transformStudentToStudentFormModule(student: Student): StudentFormModel {
    return {
      fullNameWithEmailAddress: `${student.fullName} (${student.emailAddress})`,
      emailAddress: student.emailAddress
    };
  }

  private prepareIndividualLessonRequestBody(): IndividualLessonRequestBody {
    return {
      title: this.addIndividualLessonForm.get('title').value,
      startDateOfLesson: this.addIndividualLessonForm.get('startDateOfLesson').value,
      endDateOfLesson: this.addIndividualLessonForm.get('endDateOfLesson').value,
      description: this.addIndividualLessonForm.get('description').value,
      subdomainName: localStorage.getItem(LocalStorageKeyNames.SubdomainName),
      tutorId: localStorage.getItem(LocalStorageKeyNames.UserEmailAddress),
      studentId: this.availableStudents.find(
        availableStudent => availableStudent.fullNameWithEmailAddress === this.addIndividualLessonForm.get('student').value).emailAddress
    };
  }

  saveIndividualLesson() {
    const individualLessonRequestBody: IndividualLessonRequestBody = this.prepareIndividualLessonRequestBody();
    this.store.dispatch(IndividualLessonActions.createNewIndividualLesson({ individualLessonRequestBody }));
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
