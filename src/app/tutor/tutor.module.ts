import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorComponent } from './component/tutor.component';
import { AuthorizationGuard } from '../login/guard/authorization.guard';
import { Routes, RouterModule } from '@angular/router';
import { IndividualLessonListComponent } from '../individual-lesson/component/individual-lesson-list.component';
import { IndividualLessonAddLessonComponent } from '../individual-lesson/component/individual-lesson-add-lesson.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: ':subdomainName/tutor',
    component: TutorComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'lessons/individual',
        component: IndividualLessonListComponent,
      },
      {
        path: 'lessons/individual/add',
        component: IndividualLessonAddLessonComponent,
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
    RouterModule.forChild(routes)
  ]
})
export class TutorModule { }
