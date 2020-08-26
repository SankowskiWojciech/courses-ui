import { Component, OnInit, ViewChild } from '@angular/core';
import { IndividualLesson } from '../model/individual-lesson.model';
import { IndividualLessonService } from '../service/individual-lesson.service';
import { animate, trigger, state, transition, style } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'courses-individual-lesson-list',
  templateUrl: './individual-lesson-list.component.html',
  styleUrls: ['./individual-lesson-list.component.scss'],
  animations: [
    trigger('descriptionExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class IndividualLessonListComponent implements OnInit {

  readonly columnsToRender = ['title', 'dateOfLesson', 'studentFullName', 'studentEmailAddress'];
  showFinishedLessons: boolean;
  expandedIndividualLesson: IndividualLesson | null;
  individualLessons: IndividualLesson[];
  dataSource: MatTableDataSource<IndividualLesson>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private individualLessonService: IndividualLessonService, private router: Router,
              private store: Store<any>) { }

  ngOnInit(): void {
    //TODO: Unsubscribe
    this.store.select('individualLesson').subscribe(
      individualLesson => this.showFinishedLessons = individualLesson.showFinishedLessons
    );
    this.individualLessonService.getIndividualLessons().subscribe(
      individualLessons => {
        this.individualLessons = individualLessons;
        this.prepareDataSource();
      }
    );
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleShowingFinishedLessons() {
    this.store.dispatch(
      { type: '[Individual Lesson] Toggle showing finished lessons' }
    );
    if (this.showFinishedLessons) {
      this.dataSource.data = this.individualLessons;
    } else {
      this.dataSource.data = this.getOnlyUnfinishedIndividualLessons();
    }
  }

  private getOnlyUnfinishedIndividualLessons(): IndividualLesson[] {
    const currentDate = new Date();
    return this.individualLessons.filter(individualLesson => new Date(individualLesson.dateOfLesson) >= currentDate);
  }

  private prepareDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.showFinishedLessons ? this.individualLessons : this.getOnlyUnfinishedIndividualLessons();
  }
}
