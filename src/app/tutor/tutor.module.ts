import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorComponent } from './component/tutor.component';
import { SubdomainResolver } from '../subdomain/service/subdomain-resolver.service';
import { AuthorizationGuard } from '../login/guard/authorization.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':subdomainName/tutor',
    component: TutorComponent,
    resolve: { subdomainInformation: SubdomainResolver },
    canActivate: [AuthorizationGuard]
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
