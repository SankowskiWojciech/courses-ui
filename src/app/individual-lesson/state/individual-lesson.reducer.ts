import { createReducer, on, createAction } from '@ngrx/store';

export const individualLessonReducer = createReducer(
  { showFinishedLessons: false },
  on(createAction('[Individual Lesson] Toggle showing finished lessons'), state => {
    return {
      ...state,
      showFinishedLessons: !state.showFinishedLessons
    };
  })
);
