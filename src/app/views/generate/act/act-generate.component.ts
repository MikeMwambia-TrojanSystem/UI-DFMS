import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-act-generate',
  templateUrl: './act-generate.component.html',
  styleUrls: ['./act-generate.component.scss'],
})
export class ActGenerateComponent {
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
  });

  onStartUpload() {
    this.fileUpload.nativeElement.click();
  }
}
