import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupLesson } from '../model/group-lesson.model';
import { GROUP_LESSONS_BACKEND_URL } from 'src/app/constant/backend-urls.constant';
import { LessonFilteringKeys } from 'src/app/lesson/constants/lesson-filtering-keys.constant';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';

@Injectable({
  providedIn: 'root'
})
export class GroupLessonService {

  constructor(private http: HttpClient) { }

  getGroupLessons(): Observable<GroupLesson[]> {
    return this.http.get<GroupLesson[]>(this.getUrlWithSubdomainAliasFilter());
  }

  private getUrlWithSubdomainAliasFilter(): string {
    return `${GROUP_LESSONS_BACKEND_URL}?${LessonFilteringKeys.SubdomainAliasFilteringKey}=${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}`;
  }
}
