import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { phoneNumberValidator } from '../../../shared/validators/phone-number';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
})
export class CreateEmployeeComponent {
  // @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    term: new FormControl('', Validators.required),
    education: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, phoneNumberValidator]),
    profilePic: new FormControl(null),
  });

  departments = ['Department of Works']; // List of availabe departments

  // onStartUpload(): void {
  //   this.fileUpload.nativeElement.click();
  // }
}
