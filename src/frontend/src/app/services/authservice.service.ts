import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private apiUrlRegister =   'http://localhost:8000/api/register';
  private apiUrlLogin =      'http://localhost:8000/api/login';
  private apiIrlUpdateUser = 'http://localhost:8000/api/update-user';

  constructor(private http: HttpClient) { }

  register(information: any): Observable<any> {
    console.log(information);
    return this.http.post(this.apiUrlRegister, information);
  }

  login(credentials: any): Observable<any> {
    const Credentials = {
      user_email: credentials.email,
      user_password: credentials.password
    };
    console.log(Credentials);
    return this.http.post(this.apiUrlLogin, Credentials);
  }

  editUser(userInformation: any): Observable<any> {
    return this.http.put(this.apiIrlUpdateUser, userInformation);
  }
  
}
