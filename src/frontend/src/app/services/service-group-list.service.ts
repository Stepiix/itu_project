import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGroupListService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getGroups(userId: string): Observable<any> {
    const apiUrlWithUserId = `${this.apiUrl}groups?userId=${userId}`;
    return this.http.get(apiUrlWithUserId);
  }

  createGroup(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}create-group`, formData);
  }
  
  getInfoAboutGroup(groupId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${groupId}`);
  }
}
