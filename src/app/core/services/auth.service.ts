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
    localStorage.clear();
    window.location.reload();
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('_s_e_c_u_r_e__t_o_k_e_n', tokenValue)
  }

  getToken() {
    return localStorage.getItem('_s_e_c_u_r_e__t_o_k_e_n');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('_s_e_c_u_r_e__t_o_k_e_n');
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

