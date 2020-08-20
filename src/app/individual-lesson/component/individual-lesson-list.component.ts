import { Component, OnInit } from '@angular/core';
import { IndividualLesson } from '../model/individual-lesson.model';
import { IndividualLessonService } from '../service/individual-lesson.service';

@Component({
  selector: 'courses-individual-lesson-list',
  templateUrl: './individual-lesson-list.component.html',
  styleUrls: ['./individual-lesson-list.component.scss']
})
export class IndividualLessonListComponent implements OnInit {

  individualLessons: IndividualLesson[];

  constructor(private individualLessonService: IndividualLessonService) { }

  ngOnInit(): void {
    this.individualLessonService.getIndividualLessons().subscribe(
      individualLessons => this.individualLessons = individualLessons
    );
  }
}
