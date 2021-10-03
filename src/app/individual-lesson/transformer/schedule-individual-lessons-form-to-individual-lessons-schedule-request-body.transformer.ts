import { FormGroup } from '@angular/forms';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';
import { ScheduleTypes } from '../constants/schedule-types.constant';
import { Weekdays } from '../constants/weekdays.constant';
import { DayOfWeekWithTimes } from '../model/day-of-week-with-times.model';
import { IndividualLessonsScheduleRequestBody } from '../model/individual-lessons-schedule-request-body.model';
import { StudentFormModel } from '../model/student-form-model.model';

const weekdays = Object.keys(Weekdays);

export function transformScheduleIndividualLessonsFormToIndividualLessonsScheduleRequestBody(scheduleIndividualLessonsForm: FormGroup, studentsAvailableForTutor: StudentFormModel[]): IndividualLessonsScheduleRequestBody {
  return {
    beginningDate: scheduleIndividualLessonsForm.get('lessonDates').get('lessonStartDate').value,
    endDate: scheduleIndividualLessonsForm.get('lessonDates').get('lessonEndDate') ? scheduleIndividualLessonsForm.get('lessonDates').get('lessonEndDate').value : null,
    scheduleType: ScheduleTypes[scheduleIndividualLessonsForm.get('scheduleType').value],
    durationOfAllLessonsInMinutes: scheduleIndividualLessonsForm.get('lessonsDuration') ? scheduleIndividualLessonsForm.get('lessonsDuration').value : null,
    daysOfWeekWithTimes: prepareDaysOfWeekWithTimes(scheduleIndividualLessonsForm.get('weekdaysWithTimeRanges').value),
    titles: prepareLessonsTitles(scheduleIndividualLessonsForm.get('lessonsTitles').value),
    subdomainAlias: localStorage.getItem(LocalStorageKeyNames.SubdomainAlias),
    tutorId: localStorage.getItem(LocalStorageKeyNames.UserEmailAddress),
    studentId: getStudentId(scheduleIndividualLessonsForm.get('student').value, studentsAvailableForTutor)
  };
}

function prepareDaysOfWeekWithTimes(weekdayWithTimeRangesFormGroups: FormGroup[]): DayOfWeekWithTimes[] {
  const daysOfWeekWithTimes: DayOfWeekWithTimes[] = [];
  weekdays.forEach((weekday: string) => {
    const weekdayWithTimeRangesFormGroup: FormGroup = weekdayWithTimeRangesFormGroups[`${weekday}FormGroup`];
    const weekdayCheckboxValue: boolean = weekdayWithTimeRangesFormGroup[weekday];
    if (weekdayCheckboxValue) {
      const dayOfWeekWithTimes: DayOfWeekWithTimes = {
        dayOfWeek: Weekdays[weekday],
        startTime: weekdayWithTimeRangesFormGroup[`${weekday}StartTime`],
        endTime: weekdayWithTimeRangesFormGroup[`${weekday}EndTime`]
      };
      daysOfWeekWithTimes.push(dayOfWeekWithTimes);
    }
  });
  return daysOfWeekWithTimes;
}

function prepareLessonsTitles(lessonsTitles: string): string[] {
  if (lessonsTitles !== null && lessonsTitles.length > 0) {
    return lessonsTitles.split('\n');
  }
  return null;
}

function getStudentId(studentFormControlValue: string, studentsAvailableForTutor: StudentFormModel[]): string {
  return studentsAvailableForTutor.find(
    availableStudent => availableStudent.fullNameWithEmailAddress === studentFormControlValue).emailAddress;
}
