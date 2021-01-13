import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-bill-generate',
  templateUrl: './bill-generate.component.html',
  styleUrls: ['./bill-generate.component.scss'],
})
export class BillGenerateComponent {
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    datePublished: new FormControl('', Validators.required),
    firstReading: new FormControl('', Validators.required),
    secondReading: new FormControl('', Validators.required),
    datePassed: new FormControl('', Validators.required),
  });

  onStartUpload() {
    this.fileUpload.nativeElement.click();
  }
}
