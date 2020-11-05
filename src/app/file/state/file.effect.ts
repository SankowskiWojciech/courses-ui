import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { StatusInformationService } from 'src/app/individual-lesson/service/status-information.service';
import { FileService } from '../service/file.service';
import * as FileActions from './file.action';

@Injectable()
export class FileEffects {

  private readonly NEW_FILE_UPLOAD_SUCCESS_MESSAGE_TRANSLATION_KEY = 'files.newFileUploadSuccess';
  private readonly NEW_FILE_UPLOAD_FAILURE_MESSAGE_TRANSLATION_KEY_PREFIX = 'files.apiErrorMessages.';

  constructor(private actions$: Actions, private fileService: FileService,
              private statusInformationService: StatusInformationService, private translateService: TranslateService) { }

  uploadNewFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.uploadNewFile),
      exhaustMap(action => this.fileService.uploadFile(action.file).pipe(
        map(fileInformation => FileActions.uploadNewFileSuccess({ fileInformation })),
        catchError(errorCode => of(FileActions.uploadNewFileFailure({ errorCode })))
      ))
    );
  });

  @Effect({ dispatch: false })
  uploadNewFileSuccess$ = this.actions$.pipe(
    ofType(FileActions.uploadNewFileSuccess),
    tap(() => {
      const translatedSuccesseMessage = this.translateService.instant(this.NEW_FILE_UPLOAD_SUCCESS_MESSAGE_TRANSLATION_KEY);
      this.statusInformationService.openSuccessSnackBar(translatedSuccesseMessage);
    })
  );

  @Effect({ dispatch: false })
  uploadNewFileFailure$ = this.actions$.pipe(
    ofType(FileActions.uploadNewFileFailure),
    tap((action) => {
      const errorCode = action.errorCode.toLowerCase();
      const translatedFailureMessage = this.translateService.instant(`${this.NEW_FILE_UPLOAD_FAILURE_MESSAGE_TRANSLATION_KEY_PREFIX}${errorCode}`);
      this.statusInformationService.openFailureSnackBar(translatedFailureMessage);
    })
  );

  loadFilesInformation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FileActions.loadFilesInformation),
      mergeMap(() => this.fileService.getFilesInformation().pipe(
        map(filesInformation => FileActions.loadFilesInformationSuccess({ filesInformation }))
      ))
    );
  });
}
