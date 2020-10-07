import { StudentFormModel } from '../model/student-form-model.model';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { IndividualLesson } from '../model/individual-lesson.model';
import { TITLE_MAX_LENGTH } from '../constants/add-lesson-form-input-max-length.constant';

const DATE_PREFIX = '01-01-2020';

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
    if (lessonStartDate >= lessonEndDate) {
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

export function weekdayWithTimeRangesFormGroupValidator(weekday: string): ValidatorFn {
  return (weekdayWithTimeRangesFormGroup: AbstractControl): { [key: string]: boolean } | null => {
    const weekdayStartTime = weekdayWithTimeRangesFormGroup.get(`${weekday}StartTime`);
    const weekdayEndTime = weekdayWithTimeRangesFormGroup.get(`${weekday}EndTime`);
    if (weekdayStartTime.touched && weekdayEndTime.touched) {
      if (weekdayStartTime.value === '' || weekdayEndTime.value === '') {
        return { lessonTimesValidation: false };
      }
      const weekdayFullStartDate = Date.parse(`${DATE_PREFIX} ${weekdayStartTime.value}`);
      const weekdayFullEndDate = Date.parse(`${DATE_PREFIX} ${weekdayEndTime.value}`);
      if (weekdayFullStartDate >= weekdayFullEndDate) {
        return { lessonTimesValidation: false };
      }
    }
    return null;
  };
}

export function weekdaysFormGroupValidator(weekdayWithTimeRangesFormGroups: FormGroup[]): ValidatorFn {
  return (weekdaysFormGroup: AbstractControl): { [key: string]: boolean } | null => {
    const choosenWeekdays = [];
    weekdayWithTimeRangesFormGroups.forEach((weekdayWithTimeRanges: FormGroup) => {
      if (Object.values(weekdayWithTimeRanges.controls)[0].value) {
        choosenWeekdays.push(weekdayWithTimeRanges);
      }
    });
    if (choosenWeekdays.length === 0) {
      return { weekdaysWithTimeRangesValidation: false };
    }
    return null;
  };
}

export function lessonsTitlesValidator(lessonsTitlesFormControl: AbstractControl): { [key: string]: boolean } | null {
  if (lessonsTitlesFormControl.value && lessonsTitlesFormControl.value.trim()) {
    const lessonsTitles = lessonsTitlesFormControl.value.trim().split('\n').filter((lessonTitle: string) => lessonTitle.trim().length > 0);
    const lessonsTitlesWithExceededLength = [];
    lessonsTitles.forEach((lessonTitle: string) => {
      if (lessonTitle.length > TITLE_MAX_LENGTH) {
        lessonsTitlesWithExceededLength.push(lessonTitle);
      }
    });
    if (lessonsTitlesWithExceededLength.length) {
      return { lessonTitleTooLongValidation: false };
    }
  }
  return null;
}
