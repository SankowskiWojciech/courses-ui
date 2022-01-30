import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorComponent } from './component/tutor.component';
import { AuthorizationGuard } from '../login/guard/authorization.guard';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../individual-lesson/component/list.component';
import { AddLessonComponent } from '../individual-lesson/component/add-lesson.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ScheduleLessonsComponent } from '../individual-lesson/component/schedule-lessons.component';
import { DetailsComponent } from '../individual-lesson/component/details.component';

const INDIVIDUAL_LESSON_PREFIX = 'lessons/individual';

const routes: Routes = [
  {
    path: ':subdomainAlias/tutor',
    component: TutorComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: INDIVIDUAL_LESSON_PREFIX,
        component: ListComponent,
      },
      {
        path: INDIVIDUAL_LESSON_PREFIX + '/add',
        component: AddLessonComponent,
      },
      {
        path: INDIVIDUAL_LESSON_PREFIX + '/schedule',
        component: ScheduleLessonsComponent,
      },
      {
        path: INDIVIDUAL_LESSON_PREFIX + '/:lessonId',
        component: DetailsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [TutorComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})
export class TutorModule { }
