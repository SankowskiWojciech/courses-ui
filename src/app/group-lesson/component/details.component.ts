import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GroupLesson } from '../model/group-lesson.model';
import { getGroupLessons } from '../state/group-lesson.selector';
import { State } from '../state/group-lesson.state';
import * as GroupLessonActions from '../state/group-lesson.action';

@Component({
  selector: 'courses-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  lesson: GroupLesson;

  private ngDestroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    this.store.select(getGroupLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        lessons => {
          if (!lessons.length) {
            this.store.dispatch(GroupLessonActions.loadGroupLessons());
          }
          this.lesson = lessons.find(lesson => lesson.id === lessonId);
        }
      );
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
