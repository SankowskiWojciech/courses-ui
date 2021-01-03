import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubdomainComponent } from './component/subdomain.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { subdomainReducer } from './state/subdomain.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SubdomainEffect } from './state/subdomain.effect';
import { SUBDOMAIN_FEATURE_NAME } from './constant/feature-name.constant';

@NgModule({
  declarations: [SubdomainComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(SUBDOMAIN_FEATURE_NAME, subdomainReducer),
    EffectsModule.forFeature([SubdomainEffect])
  ]
})
export class SubdomainModule { }
