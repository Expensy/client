import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../components/base-form/base-form.component';
import { UserService } from '../../services/user/user.service';
import { AppValidators } from '../../utils/validators';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseFormComponent implements OnInit {
  errorMessage: string;
  isLoading: boolean;
  successMessage: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
    super();
  }

  ngOnInit() {
    this.errorMessage = undefined;
    this.isLoading = false;
    this.successMessage = undefined;

    this.errors = {
      first_name: [
        {
          name: 'required',
          message: 'Please enter your first name',
          when: ['dirty']
        }
      ],
      last_name: [
        {
          name: 'required',
          message: 'Please enter your last name',
          when: ['dirty']
        }
      ],
      email: [
        {
          name: 'required',
          message: 'Please enter your email address',
          when: ['dirty']
        },
        {
          name: 'email',
          message: 'Please enter a valid email address',
          when: ['dirty']
        },
        {
          name: 'unique',
          message: 'An account has already been created with this email address',
          when: []
        }
      ],
      password: [
        {
          name: 'required',
          message: 'Please enter a password',
          when: ['dirty']
        }
      ],
      password_confirmation: [
        {
          name: 'required',
          message: 'Please enter a password confirmation',
          when: ['dirty']
        }
      ]
    };

    this.buildForm();
  }

  submitForm() {
    this.errorMessage = undefined;
    this.isLoading = true;

    this.userService.create(this.form.value)
      .finally(() => this.isLoading = false)
      .subscribe(() => {
          this.successMessage = 'Your account has been created. You have to activate it to use the service. Please check your inbox mail.';
          this.form.reset();
        },
        (err: HttpErrorResponse) => {
          const fields = err.error ? err.error.message : err.message;

          Object.keys(fields).forEach((field) => {
            const control = this.form.controls[field];
            fields[field].forEach((rule) => {
              control.setErrors({[rule]: true});
            });
          });
        });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, AppValidators.email()]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    }, {
      validator: AppValidators.passwordMatch('password', 'password_confirmation')
    });
  }
}
