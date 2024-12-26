import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Blog } from '../models/blog';
import { BlogPaginationRequestBody, PaginationResponse } from '../models/common/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  readonly baseUrl = environment.baseUrl;

  readonly APIUrl = this.baseUrl + "blogs";

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.APIUrl);
  }

  getById(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.APIUrl + `/${id}`);
  }

  searchBlogs(requestBody: BlogPaginationRequestBody):Observable<PaginationResponse<Blog[]>> {
    return this.http.post<PaginationResponse<Blog[]>>(`${this.APIUrl}/search`, requestBody);
  }

  createBlog(payload: any): Observable<Blog> {
    return this.http.post<Blog>(this.APIUrl, payload);
  }

  updateBlog(payload: any): Observable<Blog> {
    return this.http.put<Blog>(this.APIUrl, payload);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + `/${id}`);
  }

}
