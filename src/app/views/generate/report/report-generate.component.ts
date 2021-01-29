import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-generate',
  templateUrl: './report-generate.component.html',
  styleUrls: ['./report-generate.component.scss'],
})
export class ReportGenerateComponent {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    authorConcerned: new FormControl('', Validators.required),
    dueDate: new FormControl('', Validators.required),
    editors: new FormArray(
      [new FormControl('King Topsy'), new FormControl('Lawrence Mike')],
      Validators.required
    ),
    originating: new FormControl('', Validators.required),
  });

  originatings = ['Petitions', 'Statements', 'Bills'];

  get editors(): string[] {
    return this.form.get('editors').value;
  }
}
