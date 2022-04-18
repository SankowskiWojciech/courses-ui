import { Lesson } from 'src/app/shared/feature/lesson.model';

export interface GroupLesson extends Lesson {
  groupName: string;
}
