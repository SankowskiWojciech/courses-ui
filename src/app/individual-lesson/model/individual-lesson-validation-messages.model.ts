import { Observable } from 'rxjs';
import { ValidationMessages } from 'src/app/lesson/model/validation-messages.model';

export interface IndividualLessonValidationMessages extends ValidationMessages {
  studentValidationMessage: Observable<string>;
}
