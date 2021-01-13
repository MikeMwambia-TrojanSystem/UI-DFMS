import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-petition-generate',
  templateUrl: './petition-generate.component.html',
  styleUrls: ['./petition-generate.component.scss'],
})
export class PetitionGenerateComponent {
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    issues: new FormControl('', Validators.required),
    sector: new FormControl('', Validators.required),
    dateProvided: new FormControl('', Validators.required),
    dateSet: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    concernedCommittee: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
  });

  onStartUpload() {
    this.fileUpload.nativeElement.click();
  }
}
