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
