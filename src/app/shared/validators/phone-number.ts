import { AbstractControl } from '@angular/forms';

/**
 * Custom validation for phone number
 */
export const phoneNumberValidator = (control: AbstractControl) => {
  const value = control.value;
  const pattern = /^(254)[\s]?\d{3}[\s]?\d{3}[\s]?\d{3}$/;
  const valid = !pattern.test(value);
  return valid ? { phoneNumber: { value: control.value } } : null;
};
