import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class InitService {

  constructor(private authService: AuthService, private userService: UserService) {}

  init() {
    const token = localStorage.getItem(environment.tokenName);
    if (token) {
      this.authService.storeCredentials(token);

      return this.userService.show('me')
        .do((user) => {
          this.authService.user.next(user);
          this.authService.project.next(user.projects[0]);
        })
        .toPromise();
    }
  }
}
