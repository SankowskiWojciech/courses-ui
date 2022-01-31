import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusInformationService } from './service/status-information.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    StatusInformationService
  ]
})
export class SharedModule { }
