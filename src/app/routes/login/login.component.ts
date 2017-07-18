import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../components/base-form/base-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';
import { AppValidators } from '../../utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseFormComponent implements OnInit {
  errorMessage: string;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private userService: UserService) {
    super();
  }

  ngOnInit() {
    // if (this.router.isActive('/login', true)) {
    //   this.router.navigate(['/']);
    // }

    this.errorMessage = undefined;

    this.errors = {
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
        }
      ],
      password: [
        {
          name: 'error',
          message: 'Invalid password',
          when: ['dirty']
        },
        {
          name: 'required',
          message: 'Enter a password',
          when: ['dirty']
        }
      ]
    };

    this.buildForm();
  }

  submitForm() {
    this.errorMessage = undefined;
    const formValues = this.form.value;

    this.isLoading = true;
    this.authService.login(formValues)
      .subscribe((data) => {
          this.authService.storeCredentials(data.token);
          this.userService.show('current')
            .subscribe((user) => {
              this.authService.user.next(user);
            });
        },
        (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = err.error ? err.error.message : err.message;
        });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, AppValidators.email()]],
      password: ['', Validators.required]
    });
  }
}
