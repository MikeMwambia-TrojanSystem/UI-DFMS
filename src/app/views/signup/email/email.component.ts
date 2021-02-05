import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { phoneNumberValidator } from '../../../shared/validators/phone-number';

@Component({
  selector: 'app-signup-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailSignupComponent {
  form = new FormGroup({
    recoveryEmail: new FormControl('', [Validators.required, Validators.email]),
    recoveryPhone: new FormControl('', [
      Validators.required,
      phoneNumberValidator,
    ]),
  }); // Form group that holds username and password from user input
  phoneNumer = '254 475 895 545'; // Current phone number
  email = 'mayusd@example.com'; // Current email

  /**
   * Getters to access form value
   */
  get recoveryEmail(): string {
    return this.form.get('recoveryEmail').value;
  }

  get recoveryPhone(): string {
    return this.form.get('recoveryPhone').value;
  }

  onVerifyPhone(): void {
    if (this.form.get('recoveryPhone').valid) {
      // Code for sending verify code to phone number here
    }
  }

  onVerifyEmail(): void {
    if (this.form.get('recoveryEmail').valid) {
      // Code for sending verify code to email here
    }
  }
}
