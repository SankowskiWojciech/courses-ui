import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdomainComponent } from './component/subdomain.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SubdomainComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SubdomainModule { }
