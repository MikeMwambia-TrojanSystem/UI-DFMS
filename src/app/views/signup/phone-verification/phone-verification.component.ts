import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-phone-verification',
  templateUrl: './phone-verification.component.html',
  styleUrls: ['./phone-verification.component.scss'],
})
export class PhoneVerificationComponent {
  valid = false;

  /**
   * Check if the otp is filled or not
   */
  onOtpChange(otp: string) {
    if (otp.length === 6) {
      this.valid = true;
    }
  }
}
