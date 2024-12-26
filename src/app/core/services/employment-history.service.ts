import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmploymentHistory } from '../models/employment-history';

@Injectable({
  providedIn: 'root'
})
export class EmploymentHistoryService {

  readonly baseUrl = environment.baseUrl;

  readonly APIUrl = this.baseUrl + "histories";

  constructor(private http: HttpClient) { }

  getEmploymentHistories(): Observable<EmploymentHistory[]> {
    return this.http.get<EmploymentHistory[]>(this.APIUrl);
  }

  createEmploymentHistory(payload: any): Observable<EmploymentHistory> {
    return this.http.post<EmploymentHistory>(this.APIUrl, payload);
  }

  updateEmploymentHistory(payload: any): Observable<EmploymentHistory> {
    return this.http.put<EmploymentHistory>(this.APIUrl, payload);
  }

  deleteEmploymentHistory(id: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + `/${id}`);
  }
}
