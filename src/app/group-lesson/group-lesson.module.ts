import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './component/list.component';
import { FileModule } from '../file/file.module';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { GROUP_LESSON_FEATURE_STATE_NAME } from './constants/feature-name.constant';
import { LessonModule } from '../lesson/lesson.module';
import { groupLessonReducer } from './state/group-lesson.reducer';
import { GroupLessonEffects } from './state/group-lesson.effect';

const ANGULAR_MATERIAL_MODULES = [
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatCardModule,
  MatTabsModule
];

const COURSES_MODULES = [
  FileModule,
  SharedModule,
  LessonModule
];

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ...ANGULAR_MATERIAL_MODULES,
    MaterialFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature(GROUP_LESSON_FEATURE_STATE_NAME, groupLessonReducer),
    EffectsModule.forFeature([GroupLessonEffects]),
    TranslateModule,
    ...COURSES_MODULES
  ]
})
export class GroupLessonModule { }
