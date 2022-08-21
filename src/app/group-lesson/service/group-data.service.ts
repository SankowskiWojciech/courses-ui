import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GROUPS_BACKEND_URL } from 'src/app/constant/backend-urls.constant';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';
import { LessonFilteringKeys } from 'src/app/lesson/constants/lesson-filtering-keys.constant';
import { Group } from '../model/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupDataService {

  constructor(private http: HttpClient) { }

  getGroupsAvailableForTutor(): Observable<Group[]> {
    return this.http.get<Group[]>(this.getUrlWithSubdomainAliasFilter());
  }

  private getUrlWithSubdomainAliasFilter(): string {
    return `${GROUPS_BACKEND_URL}?${LessonFilteringKeys.SubdomainAliasFilteringKey}=${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}`;
  }
}
