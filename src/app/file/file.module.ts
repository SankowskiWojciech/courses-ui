import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './component/file-upload.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fileReducer } from './state/file.reducer';
import { FileEffects } from './state/file.effect';
import { FileListComponent } from './component/file-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';

const ANGULAR_MATERIAL_MODULES = [
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatIconModule,
  MatTooltipModule
];

@NgModule({
  declarations: [FileUploadComponent, FileListComponent],
  imports: [
    CommonModule,
    RouterModule,
    ...ANGULAR_MATERIAL_MODULES,
    MaterialFileInputModule,
    ReactiveFormsModule,
    StoreModule.forFeature('fileState', fileReducer),
    EffectsModule.forFeature([FileEffects]),
    TranslateModule
  ],
  exports: [
    FileUploadComponent,
    FileListComponent
  ]
})
export class FileModule { }
