import { FormGroup } from '@angular/forms';

export class BaseFormComponent {
  form: FormGroup;
  errors: NgxErrors;

  constructor() {
    this.errors = {};
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
