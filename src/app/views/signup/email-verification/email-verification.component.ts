import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss'],
})
export class EmailVerificationComponent {
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
