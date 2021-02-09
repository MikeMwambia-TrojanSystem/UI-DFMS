import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { phoneNumberValidator } from 'src/app/shared/validators/phone-number';

@Component({
  selector: 'app-create-mca',
  templateUrl: './create-mca.component.html',
  styleUrls: ['./create-mca.component.scss'],
})
export class CreateMcaComponent {
  // @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    termStart: new FormControl('', Validators.required),
    termEnd: new FormControl('', Validators.required),
    politicalParty: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, phoneNumberValidator]),
    profilePic: new FormControl(null),
  });

  // onStartUpload() {
  //   this.fileUpload.nativeElement.click();
  // }
}
