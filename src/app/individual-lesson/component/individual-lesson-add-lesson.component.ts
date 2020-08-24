import { Component, OnInit } from '@angular/core';
import { IndividualLesson } from '../model/individual-lesson.model';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { Observable, observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { StudentFormModel } from '../model/student-form-model.model';
import { Student } from '../model/student.model';

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
  individualLesson: IndividualLesson;
  availableStudents: StudentFormModel[];
  filteredAvailableStudents: Observable<StudentFormModel[]>;

  constructor(private formBuilder: FormBuilder, private studentService: StudentService) { }

  ngOnInit(): void {
    this.availableStudents = this.prepareStudentsAvailableForTutor();
    this.individualLesson = this.prepareIndividualLessonFormObject();
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

  private prepareIndividualLessonFormObject(): IndividualLesson {
    return {
      title: null,
      dateOfLesson: null,
      description: null,
      subdomainName: localStorage.getItem(LocalStorageKeyNames.SUBDOMAIN_NAME),
      studentFullName: null,
      studentEmailAddress: null,
      tutorEmailAddress: localStorage.getItem(LocalStorageKeyNames.USER_EMAIL_ADDRESS)
    };
  }

  private initializeAddIndividualLessonForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      dateOfLesson: ['', Validators.required],
      student: ['', [Validators.required, studentValidator(this.availableStudents)]],
      description: ['', Validators.maxLength(2000)]
    });
  }

  private prepareStudentsAvailableForTutor(): StudentFormModel[] {
    const availableStudents: StudentFormModel[] = [];
    this.studentService.getStudentsAvailableForTutor().subscribe(
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

  saveIndividualLesson() {
  }
}
