import { ScheduleTypes } from '../constants/schedule-types.constant';
import { DayOfWeekWithTimes } from './day-of-week-with-times.model';

export interface IndividualLessonsScheduleRequestBody {
  beginningDate: Date;
  endDate: Date;
  scheduleType: string;
  allLessonsDurationInMinutes: number;
  lessonsDaysOfWeekWithTimes: DayOfWeekWithTimes[];
  lessonsTitles: string[];
  subdomainName: string;
  tutorId: string;
  studentId: string;
}
