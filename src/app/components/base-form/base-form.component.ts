import { FormGroup } from '@angular/forms';

export class BaseFormComponent {
  form: FormGroup;
  formErrors: any;
  validationMessages: any;

  constructor() {
    this.formErrors = {};
    this.validationMessages = {};
  }

  onValueChanged(data?: any) {
    if (!data) {
      return;
    }

    for (const field in data) {

      if (data.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = this.form.get(field);
        console.log('field', field, control, control.dirty, control.valid);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          console.log('messages', messages, control.errors);
          if (messages) {
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  }
}
