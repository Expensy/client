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
      const field1Control = group.get(field1);
      const field2Control = group.get(field2);

      if (field1Control.pristine || field2Control.pristine || field1Control.invalid || field2Control.invalid) {
        return null;
      }

      return field1Control.value !== field2Control.value ? {'passwordMatch': true} : null;
    };
  }
}
