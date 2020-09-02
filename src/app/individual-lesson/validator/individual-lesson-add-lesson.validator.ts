import { StudentFormModel } from '../model/student-form-model.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function studentValidator(availableStudents: StudentFormModel[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!availableStudents.filter(student => student.fullNameWithEmailAddress === control.value).length) {
      return { studentValidation: false };
    }
    return null;
  };
}

export function startDateOfLessonValidator(endDateOfLessonControl: AbstractControl): ValidatorFn {
  return (startDateOfLessonControl: AbstractControl): { [key: string]: boolean } | null => {
    const startDateOfLesson = new Date(startDateOfLessonControl.value);
    const endDateOfLesson = new Date(endDateOfLessonControl.value);
    if (startDateOfLesson > endDateOfLesson) {
      return { startDateOfLessonValidation: false };
    }
    return null;
  };
}

export function endDateOfLessonValidator(startDateOfLessonControl: AbstractControl): ValidatorFn {
  return (endDateOfLessonControl: AbstractControl): { [key: string]: boolean } | null => {
    const startDateOfLesson = new Date(startDateOfLessonControl.value);
    const endDateOfLesson = new Date(endDateOfLessonControl.value);
    if (endDateOfLesson < startDateOfLesson) {
      return { endDateOfLessonValidation: false };
    }
    return null;
  };
}
