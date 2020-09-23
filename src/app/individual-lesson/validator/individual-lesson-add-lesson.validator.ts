import { StudentFormModel } from '../model/student-form-model.model';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { IndividualLesson } from '../model/individual-lesson.model';

export function studentValidator(availableStudents: StudentFormModel[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== '' && !availableStudents.filter(student => student.fullNameWithEmailAddress === control.value).length) {
      return { studentValidation: false };
    }
    return null;
  };
}

export function lessonDatesValidator(lessonDatesFormGroup: AbstractControl): { [key: string]: boolean } | null {
  const lessonStartDateFormControl = lessonDatesFormGroup.get('lessonStartDate');
  const lessonEndDateFormControl = lessonDatesFormGroup.get('lessonEndDate');
  if (lessonStartDateFormControl.dirty && lessonEndDateFormControl.dirty) {
    const lessonStartDate = new Date(lessonStartDateFormControl.value);
    const lessonEndDate = new Date(lessonEndDateFormControl.value);
    if (lessonStartDate > lessonEndDate) {
      return { lessonDatesValidation: false };
    }
  }
  return null;
}

export function lessonCollisionValidator(individualLessons: IndividualLesson[]): ValidatorFn {
  return (lessonDatesFormGroup: AbstractControl): { [key: string]: boolean } | null => {
    const lessonStartDateFormControl = lessonDatesFormGroup.get('lessonStartDate');
    const lessonEndDateFormControl = lessonDatesFormGroup.get('lessonEndDate');
    if (lessonStartDateFormControl.dirty && lessonEndDateFormControl.dirty) {
      const lessonStartDate = new Date(lessonStartDateFormControl.value);
      const lessonEndDate = new Date(lessonEndDateFormControl.value);
      const individualLessonsCollidingWithNewOne = individualLessons.filter(
        individualLesson => lessonStartDate < new Date(individualLesson.endDateOfLesson) && lessonEndDate > new Date(individualLesson.startDateOfLesson)
      );
      if (individualLessonsCollidingWithNewOne.length) {
        return { lessonCollisionValidation: false };
      }
    }
    return null;
  };
}
