import { Injectable, ReflectiveInjector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { Project } from '../../models/project';

@Injectable()
export class AuthService {
  user: BehaviorSubject<User>;
  project: BehaviorSubject<Project>;
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject(undefined);
    this.project = new BehaviorSubject(undefined);
    this.baseUrl = `${environment.baseUrl}/api/authenticate`;
  }

  login(credentials: any) {
    return this.http.post<LoginResponse>(this.baseUrl, credentials);
  }

  logout() {
    localStorage.removeItem(environment.tokenName);
    this.user.next(undefined);
  }

  storeCredentials(token: string) {
    localStorage.setItem(environment.tokenName, token);
  }
}

interface LoginResponse {
  token: string;
}
