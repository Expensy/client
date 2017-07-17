import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import * as is from 'is_js';

export class AppValidators {
  static email(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const isEmail = is.email(control.value);
      return !isEmail ? {'email': true} : null;
    };
  }

  static passwordMatch(field1: string, field2: string): ValidatorFn {

    return (group: FormGroup): { [key: string]: any } => {
      const password = group.get(field1).value;
      const passwordConfirmation = group.get(field2).value;
      console.log('o', password, passwordConfirmation);

      return password !== passwordConfirmation ? {'passwordMatch': true} : null;
    };
  }
}
