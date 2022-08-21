import { Observable } from 'rxjs';

export interface ValidationMessages {
  titleValidationMessage: Observable<string>;
  lessonDatesValidationMessage: Observable<string>;
  lessonStartDateValidationMessage: Observable<string>;
  lessonEndDateValidationMessage: Observable<string>;
  descriptionValidationMessage: Observable<string>;
  lessonTimesValidation: Observable<string>;
  weekdaysWithTimeRangesValidationMessage: Observable<string>;
  lessonsTitlesValidationMessage: Observable<string>;
  lessonsDurationValidationMessage: Observable<string>;
}
