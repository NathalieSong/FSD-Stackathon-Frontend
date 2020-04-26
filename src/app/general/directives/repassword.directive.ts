import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const repasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const repassword = control.get('repassword');

  return password && repassword && password.value.trim() !== repassword.value.trim()
  ? { repassword: true } : null;
};

@Directive({
  selector: '[appRepassword]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: RepasswordDirective, multi: true
  }]
})
export class RepasswordDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    return repasswordValidator(control);
  }

}
