import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * The following implementation of validation for matching password can be found here:
 * https://stackoverflow.com/questions/51605737/confirm-password-validation-in-angular-6
 */

/**
 * This error state matcher can be import from a separate file in shared/ folder if needed
 */
class PasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

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
