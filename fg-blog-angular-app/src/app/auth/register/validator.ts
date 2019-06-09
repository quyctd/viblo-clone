import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';

export const NameValidator = [Validators.required, ];
export const EmailValidator =  [
    Validators.required,
    Validators.email
  ];

export const UsernameValidator = [
    Validators.required,
  ];

export const PasswordValidator =  [
    Validators.required,
    Validators.minLength(6)
  ];

export function RepeatPasswordValidator(AC: AbstractControl) {
    const password = AC.get('password').value;
    const passwordConfirmation = AC.get('re_password').value;
    if (passwordConfirmation.trim() === '') {
      return null;
    }
    if (password !== passwordConfirmation) {
      AC.get('re_password').setErrors( {MatchPassword: true} );
    } else {
      return null;
    }
}
