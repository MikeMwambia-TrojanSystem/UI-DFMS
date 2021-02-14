import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-constituencies',
  templateUrl: './create-constituencies.component.html',
  styleUrls: ['./create-constituencies.component.scss'],
})
export class CreateConstituenciesComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    subCounty: new FormControl('', Validators.required),
    type: new FormControl('constituency', Validators.required),
    assemblyId: new FormControl('2d7c88e7a78c', Validators.required),
  }); // Form group that holds user input

  county = 'Meru'; // Dynamic county name;

  constructor(private apiService: ApiService, private router: Router) {}

  onSave() {
    const value = this.form.value;

    value.date = new Date().toISOString();

    this.apiService.createWardConSub(value).subscribe(() => {
      this.router.navigate(['/list/constituency']);
    });
  }
}
