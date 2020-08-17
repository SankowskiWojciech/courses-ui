import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualLessonListComponent } from './component/individual-lesson-list.component';
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [IndividualLessonListComponent],
  imports: [
    CommonModule
  ]
})
export class IndividualLessonModule { }
