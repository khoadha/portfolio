import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../../models/external/weather-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherInfoByLocation(location: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c6a481fb35eeb4b4a44deef4adce2235`);
  }
}
