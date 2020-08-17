import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './component/login.component';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { SubdomainResolver } from '../subdomain/service/subdomain-resolver.service';

const routes: Routes = [
  {
    path: ':subdomainName/login',
    component: LoginComponent,
    resolve: { subdomainInformation: SubdomainResolver }
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
