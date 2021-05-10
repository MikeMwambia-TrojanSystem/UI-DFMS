import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Custom validation for words limit
 */
export const wordLimitsValidator = (limit: number): ValidatorFn => (
  control: AbstractControl
): { [key: string]: any } | null => {
  const value = control.value as string;
  const words = value.trim().split(' ').length;
  return words >= limit ? { wordLimits: { value: control.value } } : null;
};
