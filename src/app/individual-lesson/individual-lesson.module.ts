import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualLessonListComponent } from './component/individual-lesson-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [IndividualLessonListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule
  ]
})
export class IndividualLessonModule { }
