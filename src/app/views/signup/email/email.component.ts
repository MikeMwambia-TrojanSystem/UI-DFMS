import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-signup-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailSignupComponent {
  form = new FormGroup({
    recoveryEmail: new FormControl('', [Validators.required, Validators.email]),
    recoveryPhone: new FormControl('', Validators.required),
  }) // Form group that holds username and password from user input
  phoneNumer = '254 4758 955452'; // Current phone number
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
}
