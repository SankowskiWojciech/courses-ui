import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SubdomainModule } from './subdomain/subdomain.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PageNotFoundComponent } from './error-handling-components/page-not-found.component';
import { ForbiddenComponent } from './error-handling-components/forbidden.component';
import { AuthorizationHeaderInterceptor } from './interceptors/authorization-header.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { UnauthorizedComponent } from './error-handling-components/unauthorized.component';
import { TutorModule } from './tutor/tutor.module';
import { IndividualLessonModule } from './individual-lesson/individual-lesson.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SubdomainModule,
    LoginModule,
    TutorModule,
    IndividualLessonModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
