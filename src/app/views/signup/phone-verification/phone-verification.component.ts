import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss'],
})
export class PhoneVerificationComponent implements OnInit {
  valid = false;
  redirect: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.redirect = this.route.snapshot.queryParams.redirect;
  }

  /**
   * Check if the otp is filled or not
   */
  onOtpChange(otp: string) {
    if (otp.length === 6) {
      this.valid = true;
    }
  }
}
