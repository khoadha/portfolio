import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  
readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  searchPhotos(query: string, page: number = 1, perPage: number = 10, orderBy: string = 'relevant'): Observable<any> {
    const body = { query, page, perPage, orderBy };
    return this.http.post(`${this.baseUrl}utilities/search-photos`, body);
  }

  trackDownload(downloadLocation: string): Observable<any> {
    const body = { downloadLocation };
    return this.http.post(`${this.baseUrl}utilities/track-download`, body);
  }
}
