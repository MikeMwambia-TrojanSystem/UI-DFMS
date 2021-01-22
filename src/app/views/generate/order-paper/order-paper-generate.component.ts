import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-paper-generate',
  templateUrl: './order-paper-generate.component.html',
  styleUrls: ['./order-paper-generate.component.scss'],
})
export class OrderPaperGenerateComponent {
  form = new FormGroup({
    number: new FormControl('', Validators.required),
    sitting: new FormControl('Morning', Validators.required),
    session: new FormControl('', Validators.required),
    startingPage: new FormControl('', Validators.required),
  });
}
