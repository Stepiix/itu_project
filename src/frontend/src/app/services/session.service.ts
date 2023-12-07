import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }
  
  private isAuthenticated = false;

  isLoggedIn() {
    const sessionData = sessionStorage.getItem('userSession');
    if(sessionData){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }
}
