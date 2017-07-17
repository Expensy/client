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

    this.validationMessages = {
      form: {
        passwordMatch: 'Password do not match'
      },
      firstName: {
        required: 'Please enter your first name'
      },
      lastName: {
        required: 'Please enter your last name'
      },
      email: {
        required: 'Please enter your email',
        email: 'Please enter a valid email address',
        unique: 'An account has already been created with this email address'
      },
      password: {
        required: 'Please enter your password'
      },
      passwordConfirmation: {
        required: 'Please enter your password confirmation'
      }
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
          this.form.setErrors(err.error ? err.error.message : err.message);
          this.onValueChanged();
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

    this.form.valueChanges
      .subscribe((data: any) => this.onValueChanged(data));
    this.onValueChanged();
  }
}
