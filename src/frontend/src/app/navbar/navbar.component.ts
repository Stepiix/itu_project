import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AuthserviceService } from '../services/authservice.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true; //promena pro login a register aby se potom nezobrazoval navbare
  userInfo: any;
  constructor(private session: SessionService,private auth:AuthserviceService) { }

  ngOnInit(): void {
    if(!this.session.isLoggedIn()){
    } else {
      this.loadInfoAboutUser();
    }
  }
  loadInfoAboutUser() {
    const userId = this.session.getID();
  
    if (userId) {
      // If userId is not null
      this.auth.loadInfoAboutUser(Number(userId)).subscribe(
        (user) => {
          this.userInfo = user;
          console.log('user info',this.userInfo)
        },
        (error) => {
          console.error('Error loading user information:', error);
          // Handle the error as needed
        }
      );
    } else {
      console.error('User ID is null');
      // Handle the case where the user ID is null (not logged in or no valid user ID)
    }
  }
}
