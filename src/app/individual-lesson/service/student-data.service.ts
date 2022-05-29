import { Injectable } from '@angular/core';
import { LessonFilteringKeys } from '../../lesson/constants/lesson-filtering-keys.constant';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { STUDENTS_BACKEND_URL } from 'src/app/constant/backend-urls.constant';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  constructor(private http: HttpClient) { }

  getStudentsAvailableForTutor(): Observable<Student[]> {
    return this.http.get<Student[]>(this.getUrlWithSubdomainAliasFilter());
  }

  private getUrlWithSubdomainAliasFilter(): string {
    return `${STUDENTS_BACKEND_URL}?${LessonFilteringKeys.SubdomainAliasFilteringKey}=${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}`;
  }
}
