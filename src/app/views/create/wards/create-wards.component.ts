import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-wards',
  templateUrl: './create-wards.component.html',
  styleUrls: ['./create-wards.component.scss'],
})
export class CreateWardsComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    subCounty: new FormControl('', Validators.required),
    constituency: new FormControl('', Validators.required),
  });
  county = 'Meru'; // Dynamic county name
}
