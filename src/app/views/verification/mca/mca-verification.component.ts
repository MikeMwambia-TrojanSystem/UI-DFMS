import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { MotionService } from 'src/app/services/motion.service';
import { PhoneVerification } from 'src/app/shared/types/verification';

@Component({
  templateUrl: './mca-verification.component.html',
  styleUrls: ['./mca-verification.component.scss'],
})
export class McaVerificationComponent implements OnInit {
  private _verification: PhoneVerification;
  private _valid = false;
  private _state: 'public' | 'private' | 'draft';
  valid = false;
  redirect: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    try {
      const queryParams = this.route.snapshot.queryParams;
      const { request_id, userId, state } = queryParams;

      this._valid = true;
      this._state = state;
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
    if (this._valid) {
      this.apiService
        .verifyMca(this._verification)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            alert('Invalid OTP');
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.router.navigate(['/list/mca-employee'], {
            queryParams: {
              state: this._state,
            },
          });
        });
    }
  }
}
