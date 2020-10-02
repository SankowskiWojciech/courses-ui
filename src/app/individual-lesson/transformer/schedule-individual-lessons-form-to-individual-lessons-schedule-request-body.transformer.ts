import { FormGroup } from '@angular/forms';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { ScheduleTypes } from '../constants/schedule-types.constant';
import { Weekdays } from '../constants/weekdays.constant';
import { DayOfWeekWithTimes } from '../model/day-of-week-with-times.model';
import { IndividualLessonsScheduleRequestBody } from '../model/individual-lessons-schedule-request-body.model';

const weekdays = Object.keys(Weekdays);

export function transformScheduleIndividualLessonsFormToIndividualLessonsScheduleRequestBody(scheduleIndividualLessonsForm: FormGroup, studentId: string): IndividualLessonsScheduleRequestBody {
  return {
    beginningDate: scheduleIndividualLessonsForm.get('lessonDates').get('lessonStartDate').value,
    endDate: scheduleIndividualLessonsForm.get('lessonDates').get('lessonEndDate') ? scheduleIndividualLessonsForm.get('lessonDates').get('lessonEndDate').value : null,
    scheduleType: ScheduleTypes[scheduleIndividualLessonsForm.get('scheduleType').value],
    allLessonsDurationInMinutes: 0,//scheduleIndividualLessonsForm.get('lessonStartDate').value,
    lessonsDaysOfWeekWithTimes: prepareDaysOfWeekWithTimes(scheduleIndividualLessonsForm.get('weekdaysWithTimeRanges').value),
    lessonsTitles: prepareLessonsTitles(scheduleIndividualLessonsForm.get('lessonsTitles').value),
    subdomainName: localStorage.getItem(LocalStorageKeyNames.SubdomainName),
    tutorId: localStorage.getItem(LocalStorageKeyNames.UserEmailAddress),
    studentId: studentId
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
