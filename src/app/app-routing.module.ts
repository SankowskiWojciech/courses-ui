import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { SubdomainResolver } from './subdomain/service/subdomain-resolver.service';
import { SubdomainComponent } from './subdomain/component/subdomain.component';
import { PageNotFoundComponent } from './error-handling-components/page-not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  {
    path: ':subdomainName',
    component: SubdomainComponent,
    resolve: { subdomainInformation: SubdomainResolver }
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
