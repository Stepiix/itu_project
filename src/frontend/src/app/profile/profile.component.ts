import { Component, OnInit } from '@angular/core';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
//pridat novou componentu
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userInfo: any;

  constructor( private session: SessionService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    if(!this.session.isLoggedIn()){ // neni prihlaseny
      this.router.navigate(['/login']);
    } else { // je prihlaseny
      this.userInfo = this.session.getUserSession();
    }
  }
  odhlasit(): void {
    this.session.odhlasitSe();
  }
  openEditDialog() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
        width: '300px', // přizpůsobte šířku dialogu dle potřeby
        data: { userInfo: this.userInfo } // předání dat do dialogu
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Zpracujte výsledek z dialogu, pokud je potřeba
    });
  }

}
