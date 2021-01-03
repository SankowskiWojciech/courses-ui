import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './error-handling/forbidden.component';
import { PageNotFoundComponent } from './error-handling/page-not-found.component';
import { UnauthorizedComponent } from './error-handling/unauthorized.component';
import { SubdomainComponent } from './subdomain/component/subdomain.component';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: '403', component: ForbiddenComponent },
  { path: '401', component: UnauthorizedComponent },
  { path: ':subdomainAlias', component: SubdomainComponent },
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
