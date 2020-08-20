import { Component, OnInit, ViewChild } from '@angular/core';
import { IndividualLesson } from '../model/individual-lesson.model';
import { IndividualLessonService } from '../service/individual-lesson.service';
import { animate, trigger, state, transition, style } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'courses-individual-lesson-list',
  templateUrl: './individual-lesson-list.component.html',
  styleUrls: ['./individual-lesson-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IndividualLessonListComponent implements OnInit {

  columnsToRender = ['title', 'dateOfLesson', 'studentId'];
  displayValues = {
    title: 'Tytuł',
    dateOfLesson: 'Data zajęć',
    studentId: 'Adres e-mail studenta'
  };
  expandedIndividualLesson: IndividualLesson | null;
  dataSource: MatTableDataSource<IndividualLesson>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private individualLessonService: IndividualLessonService) { }

  ngOnInit(): void {
    this.individualLessonService.getIndividualLessons().subscribe(
      individualLessons => {
        this.dataSource = new MatTableDataSource(individualLessons);
        this.dataSource.sort = this.sort;
      }
    );
  }
}
