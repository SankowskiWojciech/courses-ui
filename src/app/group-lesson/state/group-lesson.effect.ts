
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as GroupLessonActions from './group-lesson.action';
import { mergeMap, map } from 'rxjs/operators';
import { GroupLessonService } from '../service/group-lesson.service';

@Injectable()
export class GroupLessonEffects {

  constructor(private actions$: Actions, private groupLessonService: GroupLessonService) { }

  loadGroupLessons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupLessonActions.loadGroupLessons),
      mergeMap(() => this.groupLessonService.getGroupLessons().pipe(
        map(groupLessons => GroupLessonActions.loadGroupLessonsSuccess({ groupLessons }))
      ))
    );
  });
}
