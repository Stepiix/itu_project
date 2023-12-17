import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AuthserviceService } from '../services/authservice.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true;
  userInfo: any;

  constructor(private session: SessionService, private auth: AuthserviceService, private router: Router) {}

  ngOnInit(): void {
    if (this.session.isLoggedIn()) {
      this.loadInfoAboutUser();
    }

    // Poslouchat události navigace
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Znovu načíst informace o uživateli po každé změně navigace
        if (this.session.isLoggedIn()) {
          this.loadInfoAboutUser();
        }
      });
  }

  loadInfoAboutUser() {
    const userId = this.session.getID();

    if (userId) {
      this.auth.loadInfoAboutUser(Number(userId)).subscribe(
        (user) => {
          this.userInfo = user;
          console.log('user info', this.userInfo);
        },
        (error) => {
          console.error('Error loading user information:', error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }
}
