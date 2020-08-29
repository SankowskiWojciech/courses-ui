
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IndividualLessonService } from '../service/individual-lesson.service';
import { Injectable } from '@angular/core';
import * as IndividualLessonActions from './individual-lesson.action';
import { mergeMap, map, concatMap } from 'rxjs/operators';
import { StudentDataService } from '../service/student-data.service';

@Injectable()
export class IndividualLessonEffect {

  constructor(private actions$: Actions, private individualLessonService: IndividualLessonService,
              private studentDataService: StudentDataService) { }

  loadIndividualLessons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IndividualLessonActions.loadIndividualLessons),
      mergeMap(() => this.individualLessonService.getIndividualLessons().pipe(
        map(individualLessons => IndividualLessonActions.loadIndividualLessonsSuccess({ individualLessons }))
      ))
    );
  });

  loadStudentsAvailableForTutor$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IndividualLessonActions.loadStudentsAvailableForTutor),
      mergeMap(() => this.studentDataService.getStudentsAvailableForTutor().pipe(
        map(availableStudents => IndividualLessonActions.loadStudentsAvailableForTutorSuccess({ availableStudents }))
      ))
    );
  });

  createNewIndividualLesson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IndividualLessonActions.createNewIndividualLesson),
      concatMap((action) => this.individualLessonService.createIndiviualLesson(action.individualLessonRequestBody).pipe(
        map(createdIndividualLesson => IndividualLessonActions.createNewIndividualLessonSuccess({ createdIndividualLesson }))
      ))
    );
  });
}
