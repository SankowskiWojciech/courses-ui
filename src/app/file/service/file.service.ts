import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FILES_BACKEND_URL } from 'src/app/constant/backend-urls.constant';
import { FileInformation } from '../model/file-information.model';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly FORM_DATA_FILE_KEY = 'file';
  private readonly ACCEPT_TYPE_FOR_DOWNLOADING_FILE = 'application/octet-stream';
  private readonly RESPONSE_TYPE_FOR_DOWNLOADING_FILE = 'arraybuffer';

  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    return this.http.post<FileInformation>(FILES_BACKEND_URL, this.prepareFormData(file));
  }

  getFilesInformation() {
    return this.http.get<FileInformation[]>(FILES_BACKEND_URL);
  }

  downloadFile(fileInformation: FileInformation) {
    this.http.get(`${FILES_BACKEND_URL}/${fileInformation.id}`, this.prepareOptionsForDownloadingFile()).subscribe(
      fileContent => {
        const blob = new Blob([fileContent]);
        FileSaver.saveAs(blob, fileInformation.name);
      }
    );
  }

  private prepareOptionsForDownloadingFile(): any {
    return {
      responseType: this.RESPONSE_TYPE_FOR_DOWNLOADING_FILE,
      headers: {
        Accept: this.ACCEPT_TYPE_FOR_DOWNLOADING_FILE
      }
    };
  }

  private prepareFormData(file: File) {
    const formData = new FormData();
    formData.append(this.FORM_DATA_FILE_KEY, file, file.name);
    return formData;
  }
}
