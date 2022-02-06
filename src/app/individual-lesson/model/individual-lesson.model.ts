import { FileInformation } from 'src/app/shared/feature/file/model/file-information.model';
import { Lesson } from 'src/app/shared/feature/lesson.model';

export interface IndividualLesson extends Lesson {
  studentFullName: string;
  studentEmailAddress: string;
}
