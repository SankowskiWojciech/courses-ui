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
import { IndividualLessonEffect } from './state/individual-lesson.effect';
import { MatMenuModule } from '@angular/material/menu';
import { IndividualLessonScheduleLessonsComponent } from './component/individual-lesson-schedule-lessons.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [IndividualLessonListComponent, IndividualLessonAddLessonComponent, IndividualLessonScheduleLessonsComponent],
  imports: [
    CommonModule,
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
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('individualLessonState', individualLessonReducer),
    EffectsModule.forFeature([IndividualLessonEffect]),
    TranslateModule
  ]
})
export class IndividualLessonModule { }
