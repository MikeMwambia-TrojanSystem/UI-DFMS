import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-subcounty',
  templateUrl: './create-subcounty.component.html',
  styleUrls: ['./create-subcounty.component.scss'],
})
export class CreateSubcountyComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('subcounty', Validators.required),
    assemblyId: new FormControl('2d7c82a9c', Validators.required),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  onSave() {
    const value = this.form.value;

    value.date = new Date().toISOString();

    this.apiService.createWardConSub(value).subscribe(() => {
      this.router.navigate(['/list/subcounty']);
    });
  }
}
