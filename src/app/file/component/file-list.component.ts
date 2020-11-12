import { ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNS_TO_RENDER_FOR_LIST } from '../constants/columns-to-render.constant';
import { FileInformation } from '../model/file-information.model';
import { FileService } from '../service/file.service';

@Component({
  selector: 'courses-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  readonly COLUMNS_TO_RENDER = COLUMNS_TO_RENDER_FOR_LIST;

  @Input() filesInformation: FileInformation[];

  dataSource: MatTableDataSource<FileInformation>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.filesInformation;
  }

  downloadFile(fileInformation: FileInformation) {
    this.fileService.downloadFile(fileInformation);
  }
}
