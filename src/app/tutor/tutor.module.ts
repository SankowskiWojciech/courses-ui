import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorComponent } from './component/tutor.component';
import { SubdomainResolver } from '../subdomain/service/subdomain-resolver.service';
import { AuthorizationGuard } from '../login/guard/authorization.guard';
import { Routes, RouterModule } from '@angular/router';
import { IndividualLessonListComponent } from '../individual-lesson/component/individual-lesson-list.component';
import { IndividualLessonAddLessonComponent } from '../individual-lesson/component/individual-lesson-add-lesson.component';

const routes: Routes = [
  {
    path: ':subdomainName/tutor',
    component: TutorComponent,
    // resolve: { subdomainInformation: SubdomainResolver },
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
    RouterModule.forChild(routes)
  ]
})
export class TutorModule { }
