import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss'],
})
export class CreateDepartmentComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    assemblyId: new FormControl('2d887s61a', Validators.required),
  }); // Form group that holds user input

  county = 'Meru'; // Dynamic county name;

  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  onSave() {
    this.departmentService.postDepartment(this.form.value).subscribe(() => {
      this.router.navigate(['/list/department']);
    });
  }
}
