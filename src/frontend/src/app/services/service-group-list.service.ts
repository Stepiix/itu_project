import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGroupListService {
  private apiUrl = 'http://localhost:8000/api/groups';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
