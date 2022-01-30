import { createReducer, on } from '@ngrx/store';
import { IndividualLessonState } from './individual-lesson.state';
import * as IndividualLessonActions from './individual-lesson.action';
import { PageProperties } from '../model/page-properties.model';

const defaultPageProperties: PageProperties = {
  pageSize: 5,
  pageIndex: 0
};

const individualLessonInitialState: IndividualLessonState = {
  showFinishedLessons: false,
  individualLessons: [],
  availableStudents: [],
  filterValue: '',
  pageProperties: defaultPageProperties,
  errorCode: ''
};

export const individualLessonReducer = createReducer<IndividualLessonState>(
  individualLessonInitialState,
  on(IndividualLessonActions.toggleShowingFinishedLessons, (state): IndividualLessonState => {
    return {
      ...state,
      showFinishedLessons: !state.showFinishedLessons
    };
  }),
  on(IndividualLessonActions.loadIndividualLessonsSuccess, (state, action): IndividualLessonState => {
    return {
      ...state,
      individualLessons: action.individualLessons
    };
  }),
  on(IndividualLessonActions.loadStudentsAvailableForTutorSuccess, (state, action): IndividualLessonState => {
    return {
      ...state,
      availableStudents: action.availableStudents
    };
  }),
  on(IndividualLessonActions.createNewIndividualLessonSuccess, (state, action): IndividualLessonState => {
    const updatedIndividualLessons = [...state.individualLessons, action.createdIndividualLesson];
    return {
      ...state,
      individualLessons: updatedIndividualLessons
    };
  }),
  on(IndividualLessonActions.setFilterValue, (state, action): IndividualLessonState => {
    return {
      ...state,
      filterValue: action.filterValue
    };
  }),
  on(IndividualLessonActions.setPageProperties, (state, action): IndividualLessonState => {
    return {
      ...state,
      pageProperties: action.pageProperties
    };
  }),
  on(IndividualLessonActions.scheduleIndividualLessonsSuccess, (state, action): IndividualLessonState => {
    const updatedIndividualLessons = [...state.individualLessons, ...action.scheduledIndividualLessons];
    return {
      ...state,
      individualLessons: updatedIndividualLessons,
      errorCode: ''
    };
  }),
  on(IndividualLessonActions.scheduleIndividualLessonsFailure, (state, action): IndividualLessonState => {
    return {
      ...state,
      errorCode: action.errorCode
    };
  })
);
