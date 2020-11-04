import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualLessonListComponent } from './component/individual-lesson-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { IndividualLessonAddLessonComponent } from './component/individual-lesson-add-lesson.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StoreModule } from '@ngrx/store';
import { individualLessonReducer } from './state/individual-lesson.reducer';
import { EffectsModule } from '@ngrx/effects';
import { IndividualLessonEffects } from './state/individual-lesson.effect';
import { MatMenuModule } from '@angular/material/menu';
import { IndividualLessonScheduleLessonsComponent } from './component/individual-lesson-schedule-lessons.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { FileModule } from '../file/file.module';

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
  MatSnackBarModule
];

const COURSES_MODULES = [
  FileModule
];

@NgModule({
  declarations: [IndividualLessonListComponent, IndividualLessonAddLessonComponent, IndividualLessonScheduleLessonsComponent],
  imports: [
    CommonModule,
    ...ANGULAR_MATERIAL_MODULES,
    MaterialFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('individualLessonState', individualLessonReducer),
    EffectsModule.forFeature([IndividualLessonEffects]),
    TranslateModule,
    ...COURSES_MODULES
  ]
})
export class IndividualLessonModule { }
