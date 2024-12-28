import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../../models/external/weather-data';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getWeatherInfoByLocation(location: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(`${this.baseUrl}utilities/weather?location=${location}`);
  }
}
