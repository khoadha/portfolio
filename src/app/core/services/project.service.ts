import { Injectable } from '@angular/core';
import { Project } from '../models/project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  readonly baseUrl = environment.baseUrl;

  readonly APIUrl = this.baseUrl + "projects";

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.APIUrl);
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.APIUrl}/${id}`);
  }

  createProject(payload: any): Observable<Project> {
    return this.http.post<Project>(this.APIUrl, payload);
  }

  updateProject(payload: any): Observable<Project> {
    return this.http.put<Project>(this.APIUrl, payload);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + `/${id}`);
  }
}
