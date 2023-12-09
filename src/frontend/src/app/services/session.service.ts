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
}
