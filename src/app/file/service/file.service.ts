import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FILES_BACKEND_URL } from 'src/app/constants/backend-urls.constant';
import { FileInformation } from '../model/file-information.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly FORM_DATA_FILE_KEY = 'file';

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    return this.http.post<FileInformation>(FILES_BACKEND_URL, this.prepareFormData(file));
  }

  private prepareFormData(file: File) {
    const formData = new FormData();
    formData.append(this.FORM_DATA_FILE_KEY, file, file.name);
    return formData;
  }
}
