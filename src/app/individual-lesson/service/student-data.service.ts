import { Injectable } from '@angular/core';
import { IndividualLessonFilteringKeys } from '../constants/individual-lesson-filtering-keys.constant';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {

  private readonly STUDENTS_BACKEND_URL = 'http://localhost:8091/students';

  constructor(private http: HttpClient) { }

  getStudentsAvailableForTutor(): Observable<Student[]> {
    return this.http.get<Student[]>(this.getUrlWithSubdomainNameFilter());
  }

  private getUrlWithSubdomainNameFilter(): string {
    return `${this.STUDENTS_BACKEND_URL}?${IndividualLessonFilteringKeys.SUBDOMAIN_NAME_FILTERING_KEY}=${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}`;
  }
}
