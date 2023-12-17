import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrlRegister =   'http://localhost:8000/api/register';
  private apiUrlLogin =      'http://localhost:8000/api/login';
  private apiUrlUpdateUser = 'http://localhost:8000/api/update-user';
  private apiUrlGetUser = 'http://localhost:8000/api/get-user';
  private apiUrlLoadBalance = 'http://localhost:8000/api/user-balance';

  constructor(private http: HttpClient) { }

  register(information: any): Observable<any> {
    return this.http.post(this.apiUrlRegister, information);
  }

  login(credentials: any): Observable<any> {
    const Credentials = {
      user_email: credentials.email,
      user_password: credentials.password
    };
    return this.http.post(this.apiUrlLogin, Credentials);
  }

  editUser(userInformation: FormData): Observable<any> {
    return this.http.post(this.apiUrlUpdateUser, userInformation);
  }

  loadInfoAboutUser(user_id: number): Observable<any> {
    const params = { user_id: user_id.toString() };
    return this.http.get(this.apiUrlGetUser, { params });
  }

  loadBalance(user_id: number): Observable<any> {
    const params = { user_id: user_id.toString() };
    return this.http.get(this.apiUrlLoadBalance, { params });
  }
  
}
