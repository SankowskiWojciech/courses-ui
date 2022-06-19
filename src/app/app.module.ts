import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SubdomainModule } from './subdomain/subdomain.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationHeaderInterceptor } from './interceptors/authorization-header.interceptor';
import { ErrorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { TutorModule } from './tutor/tutor.module';
import { IndividualLessonModule } from './individual-lesson/individual-lesson.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PageNotFoundComponent } from './error-handling/page-not-found.component';
import { ForbiddenComponent } from './error-handling/forbidden.component';
import { UnauthorizedComponent } from './error-handling/unauthorized.component';
import { DEFAULT_LANGUAGE } from './constant/default-language.constant';
import { GroupLessonModule } from './group-lesson/group-lesson.module';

const COURSES_MODULES = [
  GroupLessonModule,
  IndividualLessonModule,
  TutorModule,
  LoginModule,
  SubdomainModule
];

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
    BrowserAnimationsModule,
    ...COURSES_MODULES,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      name: 'Courses-UI DevTools',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      defaultLanguage: DEFAULT_LANGUAGE,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
