import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrl = 'http://localhost:8000/api/register';

  constructor(private http: HttpClient) { }

  register(information: any): Observable<any> {
    return this.http.post(this.apiUrl, information);
  }
}
