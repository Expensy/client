import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Pagination } from '../../models/pagination';
import { HttpClient } from '@angular/common/http';
import { Entry } from '../../models/entry';

@Injectable()
export class EntryService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/api/v1/projects`;

  }

  list(projectId: number) {
    return this.http.get<ListResponse>(`${this.baseUrl}/${projectId}/entries`);
  }
}

interface ListResponse {
  items: Entry[];
  paginate: Pagination;
}
