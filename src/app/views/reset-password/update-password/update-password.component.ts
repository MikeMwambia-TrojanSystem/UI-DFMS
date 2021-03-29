import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AccountService } from 'src/app/services/account.service';
import { PasswordErrorStateMatcher } from 'src/app/shared/validators/password-matcher';

@Component({
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {
  form = this.fb.group(
    {
      code: ['', Validators.required],
      requestId: ['', Validators.required],
      userId: ['', Validators.required],
      newPassword: ['', Validators.required],
      rePassword: ['', Validators.required],
      group: ['', Validators.required],
    },
    { validators: this.checkPassword }
  ); // Form group that holds username and password from user input
  matcher = new PasswordErrorStateMatcher(); // Initialize a new instance of the matcher

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;

    this.form.patchValue({
      requestId: queryParams.request_id,
      userId: queryParams.user_id,
    });

    this.form.valueChanges.subscribe(() => {
      const invalid = [];

      for (const control in this.form.controls) {
        if (this.form.controls[control].invalid) {
          invalid.push(control);
        }
      }

      console.log(invalid);
    });
  }

  /**
   * Validation function for password.
   * The return should be an object with custom error type or else Angular can't know which type of error.
   */
  checkPassword(group: FormGroup) {
    const password = group.get('newPassword').value;
    const repassword = group.get('rePassword').value;

    return password === repassword ? null : { notSame: true };
  }

  onUpdate() {
    this.accountService.updatePassword(this.form.value).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
