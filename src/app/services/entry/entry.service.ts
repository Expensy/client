import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Pagination } from '../../models/pagination';
import { HttpClient } from '@angular/common/http';
import { Entry } from '../../models/entry';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EntryService {
  private baseUrl: string;
  private entryUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/api/v1/projects`;
    this.entryUrl = `${environment.baseUrl}/api/v1/entries`;
  }

  list(projectId: number, options?: Object) {
    return this.http.get<ListResponse>(`${this.baseUrl}/${projectId}/entries`, <Object> options);
  }

  create(projectId: number, data: any) {
    return this.http.post(`${this.baseUrl}/${projectId}/entries`, data);
  }

  show(entryId: number) {
    return this.http.get<Entry>(`${this.entryUrl}/${entryId}`);
  }

  update(entryId: number, data: any) {
    return this.http.put<Entry>(`${this.entryUrl}/${entryId}`, data);
  }

  remove(entryId: number) {
    return this.http.delete(`${this.entryUrl}/${entryId}`);
  }
}

interface ListResponse {
  items: Entry[];
  stats: any[];
  paginate: Pagination;
}
