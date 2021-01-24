import { DayOfWeekWithTimes } from './day-of-week-with-times.model';

export interface IndividualLessonsScheduleRequestBody {
  beginningDate: Date;
  endDate: Date;
  scheduleType: string;
  allLessonsDurationInMinutes: number;
  lessonsDaysOfWeekWithTimes: DayOfWeekWithTimes[];
  lessonsTitles: string[];
  subdomainAlias: string;
  tutorId: string;
  studentId: string;
}
