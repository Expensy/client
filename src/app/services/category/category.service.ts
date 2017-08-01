import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Pagination } from '../../models/pagination';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category';

@Injectable()
export class CategoryService {
  private baseUrl: string;
  private categoryUrl: any;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/api/v1/projects`;
    this.categoryUrl = `${environment.baseUrl}/api/v1/categories`;
  }

  list(projectId: number) {
    return this.http.get<ListResponse>(`${this.baseUrl}/${projectId}/categories`);
  }

  create(projectId: number, data: any) {
    return this.http.post(`${this.baseUrl}/${projectId}/categories`, data);
  }

  show(categoryId: number) {
    return this.http.get<Category>(`${this.categoryUrl}/${categoryId}`);
  }

  update(categoryId: number, data: any) {
    return this.http.put<Category>(`${this.categoryUrl}/${categoryId}`, data);
  }
}

interface ListResponse {
  items: Category[];
  paginate: Pagination;
}
