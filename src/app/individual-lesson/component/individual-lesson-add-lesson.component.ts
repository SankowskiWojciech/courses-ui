import { Component, OnInit } from '@angular/core';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn, FormControl } from '@angular/forms';
import { StudentDataService } from '../service/student-data.service';
import { StudentFormModel } from '../model/student-form-model.model';
import { Student } from '../model/student.model';
import { ValidationMessages } from '../constants/validation-messages.constant';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { IndividualLessonService } from '../service/individual-lesson.service';
import { ActivatedRoute, Router } from '@angular/router';

function studentValidator(availableStudents: StudentFormModel[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!availableStudents.filter(student => student.fullNameWithEmailAddress === control.value).length) {
      return { studentValidation: false };
    }
    return null;
  };
}

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
    dateOfLessonsValidationMessage: null,
    studentValidationMessage: null,
    descriptionValidationMessage: null
  };

  constructor(private formBuilder: FormBuilder, private studentDataService: StudentDataService,
              private individualLessonService: IndividualLessonService, private router: Router,
              private route: ActivatedRoute) { }

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
    const dateOfLessonFormControl = new FormControl('', Validators.required);
    dateOfLessonFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.dateOfLessonsValidationMessage = this.getValidationMessage(dateOfLessonFormControl)
    );
    const studentFormControl = new FormControl('', [Validators.required, studentValidator(this.availableStudents)]);
    studentFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.studentValidationMessage = this.getValidationMessage(studentFormControl)
    );
    const descriptionFormControl = new FormControl('', Validators.maxLength(2000));
    descriptionFormControl.valueChanges.subscribe(
      inputValue => this.validationMessages.descriptionValidationMessage = this.getValidationMessage(descriptionFormControl)
    );
    const addIndividualLessonForm = this.formBuilder.group({
      title: titleFormControl,
      dateOfLesson: dateOfLessonFormControl,
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
    this.studentDataService.getStudentsAvailableForTutor().subscribe(
      studentsAvailableForTutor => studentsAvailableForTutor.forEach(
        student => availableStudents.push(this.transformStudentToStudentFormModule(student))
      )
    );
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
      dateOfLesson: this.addIndividualLessonForm.get('dateOfLesson').value,
      description: this.addIndividualLessonForm.get('description').value,
      subdomainName: localStorage.getItem(LocalStorageKeyNames.SubdomainName),
      tutorId: localStorage.getItem(LocalStorageKeyNames.UserEmailAddress),
      studentId: this.availableStudents.find(
        availableStudent => availableStudent.fullNameWithEmailAddress === this.addIndividualLessonForm.get('student').value).emailAddress
    };
  }

  saveIndividualLesson() {
    const individualLessonRequestBody: IndividualLessonRequestBody = this.prepareIndividualLessonRequestBody();
    this.individualLessonService.createIndiviualLesson(individualLessonRequestBody).subscribe(
      createdIndividualLesson => this.router.navigate(['../'], { relativeTo: this.route })
    );
  }
}
