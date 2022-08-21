import { StudentFormModel } from '../model/student-form-model.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function studentValidator(availableStudents: StudentFormModel[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== '' && !availableStudents.filter(student => student.fullNameWithEmailAddress === control.value).length) {
      return { studentValidation: false };
    }
    return null;
  };
}
