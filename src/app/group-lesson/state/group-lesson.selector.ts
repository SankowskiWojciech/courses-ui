import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GROUP_LESSON_FEATURE_STATE_NAME } from '../constants/feature-name.constant';
import { GroupLessonState } from './group-lesson.state';

const getGroupLessonFeatureState = createFeatureSelector<GroupLessonState>(GROUP_LESSON_FEATURE_STATE_NAME);

export const getShowFinishedLessons = createSelector(
  getGroupLessonFeatureState,
  groupLessonState => groupLessonState.showFinishedLessons
);

export const getGroupLessons = createSelector(
  getGroupLessonFeatureState,
  groupLessonState => groupLessonState.groupLessons
);

export const getFilterValue = createSelector(
  getGroupLessonFeatureState,
  groupLessonState => groupLessonState.filterValue
);

export const getPageProperties = createSelector(
  getGroupLessonFeatureState,
  groupLessonState => groupLessonState.pageProperties
);
