import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndividualLessonListComponent } from './component/individual-lesson-list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lessons/individual',
    component: IndividualLessonListComponent
  }
];

@NgModule({
  declarations: [IndividualLessonListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class IndividualLessonModule { }
