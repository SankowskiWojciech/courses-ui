import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/component/login.component';
import { SubdomainResolver } from './subdomain/service/subdomain-resolver.service';
import { SubdomainComponent } from './subdomain/component/subdomain.component';
import { PageNotFoundComponent } from './error-handling-components/page-not-found.component';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './error-handling-components/forbidden.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: '404', component: PageNotFoundComponent },
  { path: '403', component: ForbiddenComponent },
  {
    path: ':subdomainName',
    component: SubdomainComponent,
    resolve: { subdomainInformation: SubdomainResolver }
  },
  { path: ':subdomainName/login', component: LoginComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
