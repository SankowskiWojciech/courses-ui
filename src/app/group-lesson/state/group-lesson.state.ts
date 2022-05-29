import { PageProperties } from 'src/app/lesson/model/page-properties.model';
import * as AppState from '../../state/app.state';
import { GroupLesson } from '../model/group-lesson.model';
import { Group } from '../model/group.model';

export interface State extends AppState.State {
  groupLessonState: GroupLessonState;
}

export interface GroupLessonState {
  showFinishedLessons: boolean;
  groupLessons: GroupLesson[];
  availableGroups: Group[];
  filterValue: string;
  pageProperties: PageProperties;
  errorCode: string;
}
