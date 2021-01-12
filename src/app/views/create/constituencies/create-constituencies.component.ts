import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-constituencies',
  templateUrl: './create-constituencies.component.html',
  styleUrls: ['./create-constituencies.component.scss'],
})
export class CreateConstituenciesComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    sub: new FormControl('', Validators.required),
  }); // Form group that holds user input

  county = 'Meru'; // Dynamic county name;
}
