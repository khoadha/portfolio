import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly baseUrl = environment.baseUrl;
  
  readonly APIUrl = this.baseUrl + "categories";

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.APIUrl);
  }

  createCategory(payload: any): Observable<Category>{
    return this.http.post<Category>(this.APIUrl, payload);
  }

  deleteCategory(id: number): Observable<any>{
    return this.http.delete<any>(this.APIUrl + `/${id}`);
  }

}
