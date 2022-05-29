import { createAction, props } from '@ngrx/store';
import { PageProperties } from 'src/app/lesson/model/page-properties.model';
import { GroupLesson } from '../model/group-lesson.model';
import { Group } from '../model/group.model';

export const toggleShowingFinishedLessons = createAction(
  '[Group Lesson State] Toggle showing finished lessons'
);

export const loadGroupLessons = createAction(
  '[Group Lesson State] Load group lessons'
);

export const loadGroupLessonsSuccess = createAction(
  '[Group Lesson State] Load group lessons - success',
  props<{ groupLessons: GroupLesson[] }>()
);

export const loadGroupLessonsFailure = createAction(
  '[Group Lesson State] Load group lessons - failure',
  props<{ error: string }>()
);

export const setFilterValue = createAction(
  '[Group Lesson State] Set filter value',
  props<{ filterValue: string }>()
);

export const setPageProperties = createAction(
  '[Group Lesson State] Set page properties',
  props<{ pageProperties: PageProperties }>()
);
