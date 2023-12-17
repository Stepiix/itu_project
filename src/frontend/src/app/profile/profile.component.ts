import { Component, OnInit } from '@angular/core';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthserviceService } from '../services/authservice.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DataSharingService } from '../insidegroup/services/data-sharing.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userInfo: any;
  userId:any;
  userBalance: number = 0;

  constructor( private session: SessionService, private router: Router, private dialog: MatDialog,private auth:AuthserviceService,  private sanitizer: DomSanitizer, private dataSharingService: DataSharingService) {}

  ngOnInit() {
    if(!this.session.isLoggedIn()){
      this.router.navigate(['/login']);
    } else { 
      this.loadInfoAboutUser();
      this.userId = this.session.getID();
      this.loadBalance();
    }
  }
  getUserPhotoUrl(): SafeUrl {
    if (this.userInfo?.user_photo) {
      return this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.userInfo.user_photo);
    } else {
      return 'path/to/default/image'; 
    }
  }

  loadBalance() {
    this.auth.loadBalance(this.userId).subscribe(
      (balanceResponse) => {
        this.userBalance = balanceResponse.balance;
      },
      (error) => {
        console.error('Error loading user balance:', error);
      }
    );
  }

  loadInfoAboutUser() {
    const userId = this.session.getID();
  
    if (userId) {
      this.auth.loadInfoAboutUser(Number(userId)).subscribe(
        (user) => {
          this.userInfo = user;
        },
        (error) => {
          console.error('Error loading user information:', error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }



  odhlasit(): void {
    this.session.odhlasitSe();
  }
  openEditDialog() {
    this.dataSharingService.setSharedUserInfo(this.userInfo);
    const dialogRef = this.dialog.open(EditProfileComponent, {
        panelClass: 'custom-dialog-container', 
        data: { userInfo: this.userInfo } 
    });

    dialogRef.afterClosed().subscribe(result => {
        this.loadInfoAboutUser();
    });
  }

}
