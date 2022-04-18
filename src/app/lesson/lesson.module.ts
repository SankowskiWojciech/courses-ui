import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

const COURSES_MODULES = [
  SharedModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...COURSES_MODULES
  ]
})
export class LessonModule { }
