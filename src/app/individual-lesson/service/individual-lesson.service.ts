import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndividualLesson } from '../model/individual-lesson.model';
import { LessonFilteringKeys } from '../../lesson/constants/lesson-filtering-keys.constant';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { IndividualLessonsScheduleRequestBody } from '../model/individual-lessons-schedule-request-body.model';
import { INDIVIDUAL_LESSONS_BACKEND_URL, INDIVIDUAL_LESSONS_SCHEDULE_LESSONS_BACKEND_URL } from 'src/app/constant/backend-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class IndividualLessonService {

  constructor(private http: HttpClient) { }

  getIndividualLessons(): Observable<IndividualLesson[]> {
    return this.http.get<IndividualLesson[]>(this.getUrlWithSubdomainAliasFilter());
  }

  createIndiviualLesson(individualLessonRequestBody: IndividualLessonRequestBody) {
    return this.http.post<IndividualLesson>(INDIVIDUAL_LESSONS_BACKEND_URL, individualLessonRequestBody);
  }

  scheduleIndividualLessons(individualLessonsScheduleRequestBody: IndividualLessonsScheduleRequestBody) {
    return this.http.post<IndividualLesson[]>(INDIVIDUAL_LESSONS_SCHEDULE_LESSONS_BACKEND_URL, individualLessonsScheduleRequestBody);
  }

  private getUrlWithSubdomainAliasFilter(): string {
    return `${INDIVIDUAL_LESSONS_BACKEND_URL}?${LessonFilteringKeys.SubdomainAliasFilteringKey}=${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}`;
  }
}
