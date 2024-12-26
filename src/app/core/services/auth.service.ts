import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl = environment.baseUrl;
  readonly APIUrl = this.baseUrl + 'authentication';
  private redirectUrl: string | null = null;

  constructor(
    private http: HttpClient) {
  }

  verifyPasskey(key: string) {
    return this.http.get<any>(`${this.APIUrl}/verify?key=${key}`);
  }

  logOut() {
    sessionStorage.clear();
    window.location.reload();
  }

  storeToken(tokenValue: string) {
    sessionStorage.setItem('_secure_token', tokenValue)
  }

  getToken() {
    return sessionStorage.getItem('_secure_token');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('_secure_token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    return jwtHelper.decodeToken(token!);
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    const url = this.redirectUrl;
    this.redirectUrl = null;
    return url;
  }
}

