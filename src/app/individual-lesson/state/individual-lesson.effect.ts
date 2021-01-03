
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { IndividualLessonService } from '../service/individual-lesson.service';
import { Injectable } from '@angular/core';
import * as IndividualLessonActions from './individual-lesson.action';
import { mergeMap, map, concatMap, catchError, tap } from 'rxjs/operators';
import { StudentDataService } from '../service/student-data.service';
import { of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusInformationService } from '../service/status-information.service';
import { LocalStorageKeyNames } from 'src/app/constant/local-storage-key-names.constant';

@Injectable()
export class IndividualLessonEffects {

  private readonly NEW_INDIVIDUAL_LESSONS_CREATION_SUCCESS_MESSAGE_TRANSLATION_KEY = 'lessons.newIndividualLessonsCreationSuccess';
  private readonly SCHEDULE_INDIVIDUAL_LESSONS_FAILURE_MESSAGE_TRANSLATION_KEY_PREFIX = 'lessons.apiErrorMessages.';
  private readonly INDIVIDUAL_LESSONS_LIST_URL_POSTFIX = '/tutor/lessons/individual';

  constructor(private actions$: Actions, private individualLessonService: IndividualLessonService,
              private studentDataService: StudentDataService, private router: Router, private route: ActivatedRoute,
              private statusInformationService: StatusInformationService, private translateService: TranslateService) { }

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

  @Effect({ dispatch: false })
  createNewIndividualLessonSuccess$ = this.actions$.pipe(
    ofType(IndividualLessonActions.createNewIndividualLessonSuccess),
    tap(() => {
      const translatedSuccesseMessage = this.translateService.instant(this.NEW_INDIVIDUAL_LESSONS_CREATION_SUCCESS_MESSAGE_TRANSLATION_KEY);
      this.statusInformationService.openSuccessSnackBar(translatedSuccesseMessage);
      this.router.navigateByUrl(`${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}${this.INDIVIDUAL_LESSONS_LIST_URL_POSTFIX}`);
    })
  );

  scheduleIndividualLessons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(IndividualLessonActions.scheduleIndividualLessons),
      concatMap(action => this.individualLessonService.scheduleIndividualLessons(action.individualLessonsScheduleRequestBody).pipe(
        map(scheduledIndividualLessons => IndividualLessonActions.scheduleIndividualLessonsSuccess({ scheduledIndividualLessons })),
        catchError(errorCode => of(IndividualLessonActions.scheduleIndividualLessonsFailure({ errorCode })))
      ))
    );
  });

  @Effect({ dispatch: false })
  scheduleIndividualLessonsSuccess$ = this.actions$.pipe(
    ofType(IndividualLessonActions.scheduleIndividualLessonsSuccess),
    tap(() => {
      const translatedSuccesseMessage = this.translateService.instant(this.NEW_INDIVIDUAL_LESSONS_CREATION_SUCCESS_MESSAGE_TRANSLATION_KEY);
      this.statusInformationService.openSuccessSnackBar(translatedSuccesseMessage);
      this.router.navigateByUrl(`${localStorage.getItem(LocalStorageKeyNames.SubdomainAlias)}${this.INDIVIDUAL_LESSONS_LIST_URL_POSTFIX}`);
    })
  );

  @Effect({ dispatch: false })
  scheduleIndividualLessonsFailure$ = this.actions$.pipe(
    ofType(IndividualLessonActions.scheduleIndividualLessonsFailure),
    tap((action) => {
      const errorCode = action.errorCode.toLowerCase();
      const translatedFailureMessage = this.translateService.instant(`${this.SCHEDULE_INDIVIDUAL_LESSONS_FAILURE_MESSAGE_TRANSLATION_KEY_PREFIX}${errorCode}`);
      this.statusInformationService.openFailureSnackBar(translatedFailureMessage);
    })
  );
}
