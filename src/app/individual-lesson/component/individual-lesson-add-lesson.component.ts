import { Component, OnInit } from '@angular/core';
import { IndividualLesson } from '../model/individual-lesson.model';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';

@Component({
  selector: 'courses-individual-lesson-add-lesson',
  templateUrl: './individual-lesson-add-lesson.component.html',
  styleUrls: ['./individual-lesson-add-lesson.component.scss']
})
export class IndividualLessonAddLessonComponent implements OnInit {

  individualLesson: IndividualLesson;

  constructor() { }

  ngOnInit(): void {
    this.individualLesson = this.prepareIndividualLessonFormObject();
  }

  private prepareIndividualLessonFormObject(): IndividualLesson {
    return {
      title: null,
      dateOfLesson: null,
      description: null,
      subdomainName: localStorage.getItem(LocalStorageKeyNames.SUBDOMAIN_NAME),
      studentFullName: null,
      studentEmailAddress: null,
      tutorEmailAddress: localStorage.getItem(LocalStorageKeyNames.USER_EMAIL_ADDRESS)
    };
  }
}
