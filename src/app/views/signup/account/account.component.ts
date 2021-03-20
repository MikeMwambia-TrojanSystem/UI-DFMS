import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { AccountService } from 'src/app/services/account.service';

import { phoneNumberValidator } from '../../../shared/validators/phone-number';

@Component({
  selector: 'app-signup-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountSignupComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    dateCreated: [''],
    verifiedD: [false],
    group: ['', Validators.required],
    phoneNumber: ['', [Validators.required]],
    password: ['', Validators.required],
  }); // Form group that holds username and password from user input

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  onCreate() {
    const value = this.form.value;

    value.dateCreated = moment().unix();
    this.accountService
      .createAccount(value)
      .subscribe(({ request_id, userId }) => {
        const { username, group, phoneNumber } = value;
        localStorage.setItem(
          'account',
          JSON.stringify({
            phoneNumber,
            name: username,
            group,
          })
        );

        this.router.navigate(['/verification/mobile'], {
          queryParams: {
            userId,
            request_id,
          },
        });
      });
  }
}
