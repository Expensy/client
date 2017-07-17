import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/api/v1/users`;
  }

  list() {
    return this.http.get(this.baseUrl);
  }

  show(id: number | string) {
    return this.http.get(`${this.baseUrl}/${id}`)
      .map((data) => {
        return Object.assign(new User(), data);
      });
  }

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }
}
