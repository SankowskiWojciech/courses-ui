import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INDIVIDUAL_LESSON_FEATURE_STATE_NAME } from '../constants/feature-name.constant';
import { IndividualLessonState } from './individual-lesson.state';

const getIndividualLessonFeatureState = createFeatureSelector<IndividualLessonState>(INDIVIDUAL_LESSON_FEATURE_STATE_NAME);

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

export const getFilterValue = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.filterValue
);

export const getPageProperties = createSelector(
  getIndividualLessonFeatureState,
  individualLessonState => individualLessonState.pageProperties
);
