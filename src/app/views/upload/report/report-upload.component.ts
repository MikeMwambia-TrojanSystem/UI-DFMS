import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-upload-report',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.scss'],
})
export class ReportUploadComponent {
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    authorConcerned: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    editors: new FormArray(
      [new FormControl('King Topsy'), new FormControl('Lawrence Mike')],
      Validators.required
    ),
    originating: new FormControl('', Validators.required),
  });

  originatings = ['Petitions', 'Statements', 'Bills'];

  onStartUpload() {
    this.fileUpload.nativeElement.click();
  }

  get editors(): string[] {
    return this.form.get('editors').value;
  }

  get url(): string[] {
    switch (this.form.get('originating').value) {
      case 'Petitions':
        return ['/', 'list', 'petition'];
      case 'Statements':
        return ['/', 'list', 'statement'];
      case 'Bills':
        return ['/', 'list', 'bill'];
      default:
        return ['/'];
    }
  }
}
