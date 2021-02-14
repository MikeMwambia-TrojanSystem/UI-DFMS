import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-wards',
  templateUrl: './create-wards.component.html',
  styleUrls: ['./create-wards.component.scss'],
})
export class CreateWardsComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    constituency: new FormControl('', Validators.required),
    subCounty: new FormControl('', Validators.required),
    type: new FormControl('ward', Validators.required),
    assemblyId: new FormControl('2d7cc79s2af', Validators.required),
  });
  county = 'Meru'; // Dynamic county name
  subCounties = ['Food Production']; // Dynamic sub counties
  constituencies = ['Constituency 2']; // Dynamic constituencies

  constructor(private apiService: ApiService, private router: Router) {}

  onSave() {
    const value = this.form.value;

    value.date = new Date().toISOString();

    this.apiService.createWardConSub(value).subscribe(() => {
      this.router.navigate(['/list/wards']);
    });
  }
}
