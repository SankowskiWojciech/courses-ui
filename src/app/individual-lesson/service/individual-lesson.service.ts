import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IndividualLesson } from '../model/individual-lesson.model';
import { IndividualLessonFilteringKeys } from '../constants/individual-lesson-filtering-keys.constant';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { IndividualLessonRequestBody } from '../model/individual-lesson-request-body.model';
import { IndividualLessonsScheduleRequestBody } from '../model/individual-lessons-schedule-request-body.model';

@Injectable({
  providedIn: 'root'
})
export class IndividualLessonService {

  private readonly INDIVIDUAL_LESSONS_BACKEND_URL = 'http://localhost:8091/lessons/individual';

  constructor(private http: HttpClient) { }

  getIndividualLessons(): Observable<IndividualLesson[]> {
    return this.http.get<IndividualLesson[]>(this.getUrlWithSubdomainNameFilter());
  }

  createIndiviualLesson(individualLessonRequestBody: IndividualLessonRequestBody) {
    return this.http.post<IndividualLesson>(this.INDIVIDUAL_LESSONS_BACKEND_URL, individualLessonRequestBody);
  }

  scheduleIndividualLessons(individualLessonsScheduleRequestBody: IndividualLessonsScheduleRequestBody) {
    return this.http.post<IndividualLesson[]>(`${this.INDIVIDUAL_LESSONS_BACKEND_URL}/schedule`, individualLessonsScheduleRequestBody);
  }

  private getUrlWithSubdomainNameFilter(): string {
    return `${this.INDIVIDUAL_LESSONS_BACKEND_URL}?${IndividualLessonFilteringKeys.SUBDOMAIN_NAME_FILTERING_KEY}=${localStorage.getItem(LocalStorageKeyNames.SubdomainName)}`;
  }
}
