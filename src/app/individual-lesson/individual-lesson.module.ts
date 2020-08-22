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
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [IndividualLessonListComponent, IndividualLessonAddLessonComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule
  ]
})
export class IndividualLessonModule { }
