import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userSessionSubject = new BehaviorSubject<any>(null);
  userSession$ = this.userSessionSubject.asObservable();

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
  startUserSession(userID: string, firstName: string, lastName: string, email: string, photo: string){
    const sessionData = {
      userID: userID,
      firstName: firstName,
      lastName: lastName,
      email: email,
      photo: photo,
      expirationTime: new Date().getTime() + 10 * 60 * 1000 * 6 * 2
    };
    sessionStorage.setItem('userSession', JSON.stringify(sessionData));

    this.userSessionSubject.next({
      userID: sessionData.userID,
      firstName: sessionData.firstName,
      lastName: sessionData.lastName,
      email: sessionData.email,
      photo: sessionData.photo
    });
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
          email: sessionData.email,
          photo: sessionData.photo || null
        };
      } else {
        sessionStorage.removeItem('userSession');
      }
    }
  
    return null;
  }
  getID(): string | null { 
    const sessionData = sessionStorage.getItem('userSession');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      return userData.userID || null;
    } else {
      return null;
    }
  }
  updateUserSession(updatedUser: any) {
    const sessionDataString = sessionStorage.getItem('userSession');
  
    if (sessionDataString) {
      const sessionData = JSON.parse(sessionDataString);
  
      if (updatedUser.user_id) {
        sessionData.userID = updatedUser.user_id;
      }
      if (updatedUser.user_firstname) {
        sessionData.firstName = updatedUser.user_firstname;
      }
      if (updatedUser.user_lastname) {
        sessionData.lastName = updatedUser.user_lastname;
      }
      if (updatedUser.user_email) {
        sessionData.email = updatedUser.user_email;
      }
      if (updatedUser.user_photo) {
        sessionData.photo = updatedUser.user_photo;
      }
      sessionStorage.setItem('userSession', JSON.stringify(sessionData));
      this.userSessionSubject.next({
        'userID': sessionData.userID,
        'firstName': sessionData.firstName,
        'lastName': sessionData.lastName,
        'email': sessionData.email,
        'photo': sessionData.photo
      } as any);      
    }
  }

  
  
}
