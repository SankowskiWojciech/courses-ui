import { DayOfWeekWithTimes } from './day-of-week-with-times.model';

export interface IndividualLessonsScheduleRequestBody {
  beginningDate: Date;
  endDate: Date;
  scheduleType: string;
  durationOfAllLessonsInMinutes: number;
  daysOfWeekWithTimes: DayOfWeekWithTimes[];
  titles: string[];
  subdomainAlias: string;
  tutorId: string;
  studentId: string;
}
