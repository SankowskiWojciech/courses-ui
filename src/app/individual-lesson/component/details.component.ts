import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IndividualLesson } from '../model/individual-lesson.model';
import { getIndividualLessons } from '../state/individual-lesson.selector';
import * as IndividualLessonActions from '../state/individual-lesson.action';
import { State } from '../state/individual-lesson.state';

@Component({
  selector: 'courses-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  lesson: IndividualLesson;

  private ngDestroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private store: Store<State>) { }

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('lessonId');
    this.store.select(getIndividualLessons)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe(
        lessons => {
          if (!lessons.length) {
            this.store.dispatch(IndividualLessonActions.loadIndividualLessons());
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
