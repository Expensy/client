import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseFormComponent } from '../../components/base-form/base-form.component';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
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
          this.userService.show('me')
            .subscribe((user) => {
              this.authService.user.next(user);
              this.authService.project.next(user.projects[0]);
              this.router.navigate(['projects', user.projects[0].id, 'entries']);
            });
        },
        (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.errorMessage = err.error ? err.error.message : err.message;
        });
  }

  private buildForm(): void {
    this.form = this.fb.group({
      email: ['dev@expensy.com', [Validators.required, AppValidators.email()]],
      password: ['password', Validators.required]
    });
  }
}
