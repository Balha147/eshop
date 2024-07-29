import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const urlValidator: ValidatorFn = (control: AbstractControl)
  : ValidationErrors | null => {
  if (!control.value) return null;
  const valid = control.value.startsWith('http://') || control.value.startsWith('https://');
  return valid ? null : { invalidUrl: true };
};
