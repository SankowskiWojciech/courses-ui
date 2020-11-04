import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FileInput, FileValidator } from 'ngx-material-file-input';
import { Observable } from 'rxjs';
import { FILE_VALID_EXTENSIONS, FILE_MAX_SIZE_IN_BYTES } from '../constants/file-constraints.constant';
import { FileState } from '../state/file.state';
import { fileExtensionValidator } from '../validator/new-file.validator';
import * as FileActions from '../state/file.action';

@Component({
  selector: 'courses-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  readonly FILE_MAX_SIZE_IN_BYTES = FILE_MAX_SIZE_IN_BYTES;
  readonly FILE_VALID_EXTENSIONS = FILE_VALID_EXTENSIONS;

  fileUploadForm: FormGroup;
  validationMessages = null;

  private readonly TRANSLATION_KEY_PREFIX_FOR_VALIDATION_MESSAGES = 'files.formValidationErrorMessages.';

  constructor(private formBuilder: FormBuilder, private store: Store<FileState>, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.fileUploadForm = this.initializeFileUploadForm();
  }

  private initializeFileUploadForm(): FormGroup {
    const fileUploadFormControl = new FormControl(undefined, [FileValidator.maxContentSize(FILE_MAX_SIZE_IN_BYTES), fileExtensionValidator]);
    fileUploadFormControl.valueChanges.subscribe(() => this.handleFileInput(fileUploadFormControl));
    const form = this.formBuilder.group({
      fileUpload: fileUploadFormControl
    });
    return form;
  }

  private getValidationMessage(control: AbstractControl): Observable<string> {
    if ((control.touched || control.dirty) && control.errors) {
      return this.translateService.get(`${this.TRANSLATION_KEY_PREFIX_FOR_VALIDATION_MESSAGES}${Object.keys(control.errors)[0]}`);
    }
    return null;
  }

  handleFileInput(fileUploadFormControl: FormControl) {
    this.validationMessages = this.getValidationMessage(fileUploadFormControl);
    if (fileUploadFormControl.valid && fileUploadFormControl.value) {
      const fileInput: FileInput = this.fileUploadForm.get('fileUpload').value;
      this.store.dispatch(FileActions.uploadNewFile({ file: fileInput.files[0] }));
    }
  }
}
