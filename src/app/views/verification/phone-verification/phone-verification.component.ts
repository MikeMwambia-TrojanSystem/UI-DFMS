import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

import { PhoneVerification } from 'src/app/shared/types/verification';

@Component({
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss'],
})
export class PhoneVerificationComponent implements OnInit {
  private _verification: PhoneVerification;
  private _user: boolean;
  valid = false;
  redirect: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    try {
      const queryParams = this.route.snapshot.queryParams;
      const { request_id, userId, user } = queryParams;

      this._user = user === 'true';
      this._verification = {
        code: '',
        request_id,
        userId,
      };
    } catch (error) {
      this.location.back();
    }
  }

  /**
   * Check if the otp is filled or not
   */
  onOtpChange(otp: string) {
    this._verification = {
      ...this._verification,
      code: otp,
    };
    this.valid = otp.length === 6;
  }

  onSend() {
    if (this._user) {
      this._verification.db = 'users';
      this.accountService
        .verifyOtp(this._verification)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            alert('Invalid OTP');

            return throwError(error);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/create/mca'], {
            queryParams: {
              user: true,
            },
          });
        });
    } else {
      this._verification.db = 'users';
      this.accountService
        .verifyOtp(this._verification)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            alert('Invalid OTP');

            return throwError(error);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/intro'], {
            queryParams: {
              user: true,
            },
          });
        });
    }
  }
}
