import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { ArticleModalComponent } from './article-modal/article-modal.component'
import { Article } from './model/article'

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private papa: Papa,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }
  title = 'csv-app';
  dataList: any[] = [];
  header: any[] = [];
  page: number = 1;
  pageSize: number = 5;

  private modalRef: NgbModalRef;

  @ViewChild('fileImportInput') fileImportInput: any;

  // listen for uploading file
  uploadListener($event: any): void {
    let csv = $event.srcElement.files[0];

    if (this.isCSVFile(csv)) {

      this.papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.dataList = result.data;
          this.header = result.meta.fields;
        }
      });

    } else {
      this.toastr.error("Please import valid .csv file.");
      this.fileReset();
    }
  }

  // check if file is a valid csv
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  // empty input for upload file 
  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.dataList = [];
  }

  // open modal for editing selected item
  openModal(article: Article): void {
    this.modalRef = this.modalService.open(ArticleModalComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.article = article;
  }

  // add new record 
  add(): void {
    this.modalRef = this.modalService.open(ArticleModalComponent, { size: 'lg', backdrop: 'static' });
    this.modalRef.componentInstance.article = null;
    this.modalRef.result.then((result) => {
      if (result) {
        this.dataList.push(result);
        console.log(this.dataList);
      }
    });
  }

  // create new csv file and download it
  downloadFile(): void {
    let unparsed = this.papa.unparse(this.dataList,{delimiter: ';'});

    let csvData = new Blob([unparsed], { type: 'text/csv;charset=utf-8;' });
    let csvURL = window.URL.createObjectURL(csvData);
    let tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'Artikel_data.csv');
    tempLink.click();
  }

}

