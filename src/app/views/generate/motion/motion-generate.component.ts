import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-motion-generate',
  templateUrl: './motion-generate.component.html',
  styleUrls: ['./motion-generate.component.scss'],
})
export class MotionGenerateComponent {
  form = new FormGroup({
    content: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    sponsor: new FormControl('', Validators.required),
  });
}
