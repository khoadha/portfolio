import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserApiResponse } from '../../models/external/user';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<UserApiResponse> {
    return this.http.get<UserApiResponse>(`https://randomuser.me/api/`);
  }
}
