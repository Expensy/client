import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  user: BehaviorSubject<User>;
  private baseUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.user = new BehaviorSubject(undefined);
    this.baseUrl = `${environment.baseUrl}/api/authenticate`;
  }

  login(credentials: any) {
    return this.http.post<LoginResponse>(this.baseUrl, credentials);
  }

  logout() {
    localStorage.removeItem(environment.tokenName);
    this.user.next(undefined);
    this.router.navigate(['/login']);
  }

  storeCredentials(token: string) {
    localStorage.setItem(environment.tokenName, token);
  }
}

interface LoginResponse {
  token: string;
}
