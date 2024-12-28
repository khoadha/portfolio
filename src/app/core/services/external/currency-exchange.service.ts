import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {

  constructor(private http: HttpClient) { }

  getConversionExchange():Observable<any>{
    return this.http.get<any>('https://v6.exchangerate-api.com/v6/0f56e88da746667f89cbd7e1/latest/USD');
  }
}
