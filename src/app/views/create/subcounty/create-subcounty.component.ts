import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-subcounty',
  templateUrl: './create-subcounty.component.html',
  styleUrls: ['./create-subcounty.component.scss'],
})
export class CreateSubcountyComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  });
}
