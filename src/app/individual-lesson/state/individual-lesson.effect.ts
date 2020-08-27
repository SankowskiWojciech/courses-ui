
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IndividualLessonService } from '../service/individual-lesson.service';
import { Injectable } from '@angular/core';
import * as IndividualLessonActions from './individual-lesson.action';
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class IndividualLessonEffect {

  constructor(private actions$: Actions,
              private individualLessonService: IndividualLessonService) { }

  loadIndividualLessons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IndividualLessonActions.loadIndividualLessons),
      mergeMap(() => this.individualLessonService.getIndividualLessons().pipe(
        map(individualLessons => IndividualLessonActions.loadIndividualLessonsSuccess({ individualLessons }))
      ))
    );
  });
}
