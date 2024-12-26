import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  readonly baseUrl = environment.baseUrl;
  
  readonly APIUrl = this.baseUrl + "profiles";

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile>{
    return this.http.get<Profile>(this.APIUrl);
  }

  updateProfile(payload: any): Observable<Profile> {
    return this.http.put<Profile>(this.APIUrl, payload);
  }
}
