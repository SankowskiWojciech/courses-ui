import { AbstractControl } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';
import { FILE_VALID_EXTENSIONS } from '../constants/file-constraints.constant';

export function fileExtensionValidator(fileUploadFormControl: AbstractControl): { [key: string]: boolean } | null {
  if (fileUploadFormControl.value) {
    const fileInputValue: FileInput = fileUploadFormControl.value;
    const fileName = fileInputValue.fileNames;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    if (!FILE_VALID_EXTENSIONS.includes(fileExtension)) {
      return { fileExtensionValidation: false };
    }
  }
  return null;
}
