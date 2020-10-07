
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { IndividualLessonService } from '../service/individual-lesson.service';
import { Injectable } from '@angular/core';
import * as IndividualLessonActions from './individual-lesson.action';
import { mergeMap, map, concatMap, catchError } from 'rxjs/operators';
import { StudentDataService } from '../service/student-data.service';
import { of } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalStorageKeyNames } from 'src/app/constants/local-storage-key-names.constant';

@Injectable()
export class IndividualLessonEffects {

  private readonly SNACK_BAR_CONFIG: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    duration: 3000
  };
  private readonly SNACK_BAR_CONFIG_FOR_SUCCESS_RESULT: MatSnackBarConfig = {
    ...this.SNACK_BAR_CONFIG,
    panelClass: ['success-snackbar']
  };
  private readonly SNACK_BAR_CONFIG_FOR_FAILURE_RESULT: MatSnackBarConfig = {
    ...this.SNACK_BAR_CONFIG,
    panelClass: ['failure-snackbar']
  };

  constructor(private actions$: Actions, private individualLessonService: IndividualLessonService,
    private studentDataService: StudentDataService, private statusInformationSnackBar: MatSnackBar,
    private translateService: TranslateService, private router: Router) { }

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
      concatMap(action => this.individualLessonService.createIndiviualLesson(action.individualLessonRequestBody).pipe(
        map(createdIndividualLesson => IndividualLessonActions.createNewIndividualLessonSuccess({ createdIndividualLesson }))
      ))
    );
  });

  scheduleIndividualLessons$ = createEffect(() => {
    let translatedSuccessMessage = this.translateService.get('lessons.statusInformation.success').subscribe(translatedMessage => translatedSuccessMessage = translatedMessage);
    let translatedFailureMessage = this.translateService.get('lessons.statusInformation.failure').subscribe(translatedMessage => translatedFailureMessage = translatedMessage);
    return this.actions$.pipe(
      ofType(IndividualLessonActions.scheduleIndividualLessons),
      concatMap(action => this.individualLessonService.scheduleIndividualLessons(action.individualLessonsScheduleRequestBody).pipe(
        map(scheduledIndividualLessons => {
          this.router.navigateByUrl(`${localStorage.getItem(LocalStorageKeyNames.SubdomainName)}/tutor/lessons/individual`);
          this.statusInformationSnackBar.open(translatedSuccessMessage, '', this.SNACK_BAR_CONFIG_FOR_SUCCESS_RESULT);
          return IndividualLessonActions.scheduleIndividualLessonsSuccess({ scheduledIndividualLessons });
        }),
        catchError(errorCode => {
          this.statusInformationSnackBar.open(translatedFailureMessage, '', this.SNACK_BAR_CONFIG_FOR_FAILURE_RESULT);
          return of(IndividualLessonActions.scheduleIndividualLessonsFailure({ errorCode }));
        })
      ))
    );
  });
}
