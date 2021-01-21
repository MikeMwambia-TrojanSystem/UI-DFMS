import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { PasswordErrorStateMatcher } from '../../../shared/validators/password-matcher';

@Component({
  selector: 'app-signup-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.scss'],
})
export class CountySignupComponent {
  county = 'Meru'; // Field for dynamic county
  form = new FormGroup(
    {
      password: new FormControl('', Validators.required),
      repassword: new FormControl(''),
    },
    { validators: this.checkPassword }
  ); // Form group that holds password from user input
  matcher = new PasswordErrorStateMatcher(); // Initialize a new instance of the matcher

  /**
   * Validation function for password.
   * The return should be an object with custom error type or else Angular can't know which type of error.
   */
  checkPassword(group: FormGroup) {
    const password = group.get('password').value;
    const repassword = group.get('repassword').value;

    return password === repassword ? null : { notSame: true };
  }
}
