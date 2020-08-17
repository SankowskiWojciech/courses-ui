import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './error-handling-components/page-not-found.component';
import { AppComponent } from './app.component';
import { ForbiddenComponent } from './error-handling-components/forbidden.component';
import { UnauthorizedComponent } from './error-handling-components/unauthorized.component';

const routes: Routes = [
  { path: '404', component: PageNotFoundComponent },
  { path: '403', component: ForbiddenComponent },
  { path: '401', component: UnauthorizedComponent },
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
