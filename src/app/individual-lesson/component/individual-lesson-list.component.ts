import { Component, OnInit, ViewChild } from '@angular/core';
import { IndividualLesson } from '../model/individual-lesson.model';
import { animate, trigger, state, transition, style } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/individual-lesson.state';
import { getShowFinishedLessons, getIndividualLessons } from '../state/individual-lesson.selector';
import * as IndividualLessonActions from '../state/individual-lesson.action';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  private ngDestroyed$ = new Subject();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private router: Router, private store: Store<State>) { }

  ngOnInit(): void {
    this.store.select(getShowFinishedLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        showFinishedLessons => this.showFinishedLessons = showFinishedLessons
      );

    this.store.select(getIndividualLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        individualLessons => {
          this.individualLessons = individualLessons;
          this.prepareDataSource();
          if (!this.individualLessons.length) {
            this.store.dispatch(IndividualLessonActions.loadIndividualLessons());
          }
        }
      );
  }

  filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleShowingFinishedLessons() {
    this.store.dispatch(IndividualLessonActions.toggleShowingFinishedLessons());
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
