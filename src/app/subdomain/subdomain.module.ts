import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdomainComponent } from './component/subdomain.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { SubdomainResolver } from './service/subdomain-resolver.service';

const routes: Routes = [
  {
    path: ':subdomainName',
    component: SubdomainComponent,
    resolve: { subdomainInformation: SubdomainResolver }
  }
];

@NgModule({
  declarations: [SubdomainComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class SubdomainModule { }
