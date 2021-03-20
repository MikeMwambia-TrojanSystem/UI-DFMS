import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

import { PasswordErrorStateMatcher } from 'src/app/shared/validators/password-matcher';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  county = 'Meru'; // Field for dynamic county
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  }); // Form group that holds password from user input

  constructor(private accountService: AccountService, private router: Router) {}

  onReset() {
    this.accountService
      .changePassword(this.form.value)
      .subscribe(({ request_id, userId }) => {
        this.router.navigate(['/update-password'], {
          queryParams: {
            request_id,
            user_id: userId,
          },
        });
      });
  }
}
