import { createReducer, on } from '@ngrx/store';
import { PageProperties } from 'src/app/lesson/model/page-properties.model';
import * as GroupLessonActions from './group-lesson.action';
import { GroupLessonState } from './group-lesson.state';

const defaultPageProperties: PageProperties = {
  pageSize: 5,
  pageIndex: 0
};

const groupLessonInitialState: GroupLessonState = {
  showFinishedLessons: false,
  groupLessons: [],
  availableGroups: [],
  filterValue: '',
  pageProperties: defaultPageProperties,
  errorCode: ''
};

export const groupLessonReducer = createReducer<GroupLessonState>(
  groupLessonInitialState,
  on(GroupLessonActions.toggleShowingFinishedLessons, (state): GroupLessonState => {
    return {
      ...state,
      showFinishedLessons: !state.showFinishedLessons
    };
  }),
  on(GroupLessonActions.loadGroupLessonsSuccess, (state, action): GroupLessonState => {
    return {
      ...state,
      groupLessons: action.groupLessons
    };
  }),
  on(GroupLessonActions.setFilterValue, (state, action): GroupLessonState => {
    return {
      ...state,
      filterValue: action.filterValue
    };
  }),
  on(GroupLessonActions.setPageProperties, (state, action): GroupLessonState => {
    return {
      ...state,
      pageProperties: action.pageProperties
    };
  })
);
