import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IndividualLessonState } from './individual-lesson.state';

const getIndividualLessonFeatureState = createFeatureSelector<IndividualLessonState>('individualLessonState');

export const getShowFinishedLessons = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.showFinishedLessons
);

export const getIndividualLessons = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.individualLessons
);

export const getStudentsAvailableForTutor = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.availableStudents
);

export const getExpandedIndividualLesson = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.expandedIndividualLesson
);

export const getFilterValue = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.filterValue
);

export const getPageProperties = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.pageProperties
);
