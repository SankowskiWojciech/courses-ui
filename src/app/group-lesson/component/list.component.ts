import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { COLUMNS_TO_RENDER_FOR_LIST } from 'src/app/lesson/constants/columns-to-render.constant';
import * as GroupLessonActions from '../state/group-lesson.action';
import { GroupLesson } from '../model/group-lesson.model';
import { getFilterValue, getGroupLessons, getPageProperties, getShowFinishedLessons } from '../state/group-lesson.selector';
import { State } from '../state/group-lesson.state';
import { PageProperties } from 'src/app/lesson/model/page-properties.model';

@Component({
  selector: 'courses-group-lesson-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  readonly COLUMNS_TO_RENDER = [...COLUMNS_TO_RENDER_FOR_LIST, 'groupName'];

  showFinishedLessons: boolean;
  groupLessons: GroupLesson[];
  dataSource: MatTableDataSource<GroupLesson>;
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
    this.store.select(getGroupLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        groupLessons => {
          if (!groupLessons.length) {
            this.store.dispatch(GroupLessonActions.loadGroupLessons());
          }
          this.groupLessons = groupLessons;
          this.prepareDataSource();
        }
      );
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

  filter(): void {
    this.store.dispatch(GroupLessonActions.setFilterValue({ filterValue: this.filterValue }));
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  clearFilter(): void {
    const emptyFilterValue = '';
    this.store.dispatch(GroupLessonActions.setFilterValue({ filterValue: emptyFilterValue }));
    this.dataSource.filter = emptyFilterValue;
  }

  handleShowingFinishedLessons() {
    this.store.dispatch(GroupLessonActions.toggleShowingFinishedLessons());
    if (this.showFinishedLessons) {
      this.dataSource.data = this.groupLessons;
    } else {
      this.dataSource.data = this.getOnlyUnfinishedGroupLessons();
    }
  }

  handlePageEvent(pageEvent: PageEvent) {
    const pageProperties: PageProperties = {
      pageSize: pageEvent.pageSize,
      pageIndex: pageEvent.pageIndex
    };
    this.store.dispatch(GroupLessonActions.setPageProperties({ pageProperties }));
  }

  private getOnlyUnfinishedGroupLessons(): GroupLesson[] {
    const currentDate = new Date();
    return this.groupLessons.filter(groupLesson => new Date(groupLesson.endDate) >= currentDate);
  }

  private prepareDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.showFinishedLessons ? this.groupLessons : this.getOnlyUnfinishedGroupLessons();
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
}
