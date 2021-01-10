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

const routes: Routes = [
  {
    path: ':subdomainAlias/tutor',
    component: TutorComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'lessons/individual',
        component: ListComponent,
      },
      {
        path: 'lessons/individual/add',
        component: AddLessonComponent,
      },
      {
        path: 'lessons/individual/schedule',
        component: ScheduleLessonsComponent,
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
