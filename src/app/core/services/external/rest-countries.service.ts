import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../models/external/country';

@Injectable({
  providedIn: 'root'
})
export class RestCountriesService {

  constructor(private http: HttpClient) { }

  getCountries(field: string, query: string):Observable<Country[]>{
    return this.http.get<Country[]>(`https://restcountries.com/v3.1/${field}/${query}`);
  }
}
