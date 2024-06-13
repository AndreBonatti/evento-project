import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('dataInicial')?.value;
    const end = control.get('dataFinal')?.value;

    if (!start || !end) {
      return null; // Don't validate if either date is missing
    }

    return start > end ? { dateRangeInvalid: true } : null;
  };
}
