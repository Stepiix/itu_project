import { Component, OnInit } from '@angular/core';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userInfo: any;

  constructor( private session: SessionService, private router: Router) {}

  ngOnInit() {
    if(!this.session.isLoggedIn()){ // neni prihlaseny
      this.router.navigate(['/login'])
    } else { // je prihlaseny
      this.userInfo = this.session.getUserSession();
    }
  }
  odhlasit(): void {
    this.session.odhlasitSe();
  }

}
