import { Component, OnInit } from '@angular/core';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthserviceService } from '../services/authservice.service';
//pridat novou componentu
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userInfo: any;

  constructor( private session: SessionService, private router: Router, private dialog: MatDialog,private auth:AuthserviceService) {}

  ngOnInit() {
    if(!this.session.isLoggedIn()){ // neni prihlaseny
      this.router.navigate(['/login']);
    } else { // je prihlaseny
      // this.userInfo = this.session.getUserSession();
      // console.log(this.userInfo)
      // console.log('fotka -',this.userInfo.photo)
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



  odhlasit(): void {
    this.session.odhlasitSe();
  }
  openEditDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
        panelClass: 'custom-dialog-container', 
        data: { userInfo: this.userInfo } // předání dat do dialogu
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.userInfo = this.session.getUserSession();
        console.log('ukladam spravne session?',this.userInfo)
        console.log('fotka po update -',this.userInfo.photo )
        // Zpracujte výsledek z dialogu, pokud je potřeba
    });
  }

}
