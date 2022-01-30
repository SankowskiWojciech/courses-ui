import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IndividualLesson } from '../model/individual-lesson.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/individual-lesson.state';
import { getShowFinishedLessons, getIndividualLessons, getFilterValue, getPageProperties } from '../state/individual-lesson.selector';
import * as IndividualLessonActions from '../state/individual-lesson.action';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageProperties } from '../model/page-properties.model';
import { COLUMNS_TO_RENDER_FOR_LIST } from '../constants/columns-to-render.constant';

@Component({
  selector: 'courses-individual-lesson-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  readonly COLUMNS_TO_RENDER = COLUMNS_TO_RENDER_FOR_LIST;
  showFinishedLessons: boolean;
  individualLessons: IndividualLesson[];
  dataSource: MatTableDataSource<IndividualLesson>;
  filterValue = '';

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
    this.store.select(getPageProperties)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        pageProperties => {
          this.paginator.pageSize = pageProperties.pageSize;
          this.paginator.pageIndex = pageProperties.pageIndex;
        });
    this.store.select(getFilterValue)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(filterValue => this.filterValue = filterValue);
    this.store.select(getIndividualLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        individualLessons => {
          if (!individualLessons.length) {
            this.store.dispatch(IndividualLessonActions.loadIndividualLessons());
          }
          this.individualLessons = individualLessons;
          this.prepareDataSource();
        }
      );
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  filter(): void {
    this.store.dispatch(IndividualLessonActions.setFilterValue({ filterValue: this.filterValue }));
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter(): void {
    const emptyFilterValue = '';
    this.store.dispatch(IndividualLessonActions.setFilterValue({ filterValue: emptyFilterValue }));
    this.dataSource.filter = emptyFilterValue;
  }

  handleShowingFinishedLessons() {
    this.store.dispatch(IndividualLessonActions.toggleShowingFinishedLessons());
    if (this.showFinishedLessons) {
      this.dataSource.data = this.individualLessons;
    } else {
      this.dataSource.data = this.getOnlyUnfinishedIndividualLessons();
    }
  }

  handlePageEvent(pageEvent: PageEvent) {
    const pageProperties: PageProperties = {
      pageSize: pageEvent.pageSize,
      pageIndex: pageEvent.pageIndex
    };
    this.store.dispatch(IndividualLessonActions.setPageProperties({ pageProperties }));
  }

  redirectToLessonDetails(individualLesson: IndividualLesson) {
    console.log(`Redirecting to lesson with id: ${individualLesson.id}`);
    //TODO: redirect
  }

  private getOnlyUnfinishedIndividualLessons(): IndividualLesson[] {
    const currentDate = new Date();
    return this.individualLessons.filter(individualLesson => new Date(individualLesson.endDate) >= currentDate);
  }

  private prepareDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.showFinishedLessons ? this.individualLessons : this.getOnlyUnfinishedIndividualLessons();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
