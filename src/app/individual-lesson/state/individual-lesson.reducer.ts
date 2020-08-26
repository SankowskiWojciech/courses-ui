import { createReducer, on, createAction } from '@ngrx/store';
import { IndividualLessonState } from './individual-lesson.state';
import * as IndividualLessonActions from './individual-lesson.action';

const individualLessonInitialState: IndividualLessonState = {
  showFinishedLessons: false
};

export const individualLessonReducer = createReducer<IndividualLessonState>(
  individualLessonInitialState,
  on(IndividualLessonActions.toggleShowingFinishedLessons, (state): IndividualLessonState => {
    return {
      ...state,
      showFinishedLessons: !state.showFinishedLessons
    };
  })
);
