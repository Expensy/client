import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export class BaseFormComponent {
  form: FormGroup;
  errors: NgxErrors;

  constructor() {
    this.errors = {};
  }

  handleErrors(err: HttpErrorResponse) {
    const fields = err.error ? err.error.message : err.message;

    Object.keys(fields).forEach((field) => {
      const control = this.form.controls[field];
      fields[field].forEach((rule) => {
        control.setErrors(Object.keys(rule).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}));
      });
    });
  }
}

export interface NgxErrors {
  [key: string]: NgxError[];
}

export interface NgxError {
  name: string;
  message: string;
  when: string[];
}
