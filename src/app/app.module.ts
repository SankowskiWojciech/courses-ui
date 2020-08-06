import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { SubdomainModule } from './subdomain/subdomain.module';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './error-handling-components/page-not-found.component';
import { ForbiddenComponent } from './error-handling-components/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SubdomainModule,
    LoginModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
