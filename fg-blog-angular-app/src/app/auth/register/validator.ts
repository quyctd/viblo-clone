import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';

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

export function RepeatPasswordValidator(group: FormGroup) {
    let password = group.controls.password.value;
    let passwordConfirmation = group.controls.re_password.value;

    return password === passwordConfirmation ? null : { passwordsNotEqual: true };
}
