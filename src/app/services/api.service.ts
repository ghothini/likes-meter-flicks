import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.nodeAppUrl;

  constructor(private http: HttpClient) { }

  genericGet(endpoint: any): any {
    return this.http.get(this.url + endpoint)
  }
}
