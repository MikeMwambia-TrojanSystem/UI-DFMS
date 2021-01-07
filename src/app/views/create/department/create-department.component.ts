import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss'],
})
export class CreateDepartmentComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
  }); // Form group that holds username and password from user input
}
