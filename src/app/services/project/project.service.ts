import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Project } from '../../models/project';
import { Pagination } from '../../models/pagination';

@Injectable()
export class ProjectService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/api/v1/projects`;
  }

  list() {
    return this.http.get<ListResponse>(this.baseUrl);
  }

  show(projectId: number) {
    return this.http.get<Project>(`${this.baseUrl}/${projectId}`);
  }
}

interface ListResponse {
  items: Project[];
  paginate: Pagination;
}
