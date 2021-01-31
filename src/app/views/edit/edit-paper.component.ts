import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit-paper.component.html',
  styleUrls: ['./edit-paper.component.scss'],
})
export class EditPaperComponent {
  form = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  previousPage = 34;
  currentPage = 35;
}
