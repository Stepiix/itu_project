import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }
  
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

  odhlasitSe(){
    this.isAuthenticated = false;
    sessionStorage.removeItem("userSession");
    this.router.navigate(['/login']);
  }
  startUserSession(userID: string, firstName: string, lastName: string, email: string){
    const sessionData = {
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      expirationTime: new Date().getTime() + 10 * 60 * 1000
    };
    sessionStorage.setItem('userSession', JSON.stringify(sessionData));
  }
  getUserSession() {
    const sessionDataString = sessionStorage.getItem('userSession');
  
    if (sessionDataString) {
      const sessionData = JSON.parse(sessionDataString);
      const currentTime = new Date().getTime();
  
      // Kontrola, zda session nevypršela
      if (currentTime < sessionData.expirationTime) {
        return {
          userID: sessionData.userID,
          firstName: sessionData.firstName,
          lastName: sessionData.lastName,
          email: sessionData.email
        };
      } else {
        // Session vypršela, odstranění dat
        sessionStorage.removeItem('userSession');
      }
    }
  
    // Session neexistuje nebo vypršela
    return null;
  }
  //get userovo id
  getID(): string | null { 
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      return userData.userID || null;
    } else {
      return null;
    }
  }
}
