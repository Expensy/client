import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/api/v1/users`;
  }

  list() {
    return this.http.get(this.baseUrl);
  }

  show(id: number | string): Observable<User> {
    return this.http.get(`${this.baseUrl}/${id}`)
      .map((data) => Object.assign(new User(), data));
  }

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }
}
