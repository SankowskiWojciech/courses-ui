import { Injectable } from '@angular/core';
import { IndividualLessonFilteringKeys } from '../constants/individual-lesson-filtering-keys.constant';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { STUDENTS_BACKEND_URL } from 'src/app/constants/backend-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http: HttpClient) { }

  getStudentsAvailableForTutor(): Observable<Student[]> {
    return this.http.get<Student[]>(this.getUrlWithSubdomainAliasFilter());
  }

  private getUrlWithSubdomainAliasFilter(): string {
    return `${STUDENTS_BACKEND_URL}?${IndividualLessonFilteringKeys.SubdomainAliasFilteringKey}=${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}`;
  }
}
