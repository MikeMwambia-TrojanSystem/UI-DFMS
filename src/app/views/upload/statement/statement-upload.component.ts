import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-statement',
  templateUrl: './statement-upload.component.html',
  styleUrls: ['./statement-upload.component.scss'],
})
export class StatementUploadComponent {
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    number: new FormControl('', Validators.required),
    seeking: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    dateSought: new FormControl('', Validators.required),
    dateResponse: new FormControl('', Validators.required),
    requestTo: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    statement: new FormControl('', Validators.required),
  });

  onStartUpload(): void {
    this.fileUpload.nativeElement.click();
  }
}
