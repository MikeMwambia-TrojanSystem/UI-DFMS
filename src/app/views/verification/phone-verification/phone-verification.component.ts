import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';
import { PhoneVerification } from 'src/app/shared/types/verification';

@Component({
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss'],
})
export class PhoneVerificationComponent implements OnInit {
  private _cacheId: string;
  private _verification: PhoneVerification;
  valid = false;
  redirect: string;

  constructor(
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private apiService: ApiService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    this._cacheId = queryParams.id;

    try {
      const data = this.cacheService.data[this._cacheId];

      if (!data.subscription.closed) {
        const { userId, request_id } = data.data as {
          userId: string;
          request_id: string;
        };

        this._verification = {
          ...this._verification,
          userId,
          request_id,
        };
      } else {
        throw new Error('NO_SUB');
      }
    } catch (error) {
      alert('Session Expired');
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
    this.apiService
      .phoneVerification(this._verification)
      .subscribe((result) => {
        this.cacheService.emit(this._cacheId, null);
      });
  }
}
