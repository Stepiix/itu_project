import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmEditOfProfileComponent } from './confirm-edit-of-profile/confirm-edit-of-profile.component';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit{
  name: string = '';
  last_name: string = '';
  email: string = '';
  picture: string = '';
  heslo: string = '';
  zmenitHesloVisible: boolean = false;
  userInfo: any;

  constructor(private dialogRef: MatDialogRef<EditProfileComponent>, private session: SessionService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Tady můžete provádět inicializace nebo načítání dat, pokud je to potřeba při inicializaci komponentu.
    // Například můžete načíst data o uživateli pro úpravu profilu.
    this.userInfo = this.session.getUserSession();
  }

  zmenitHeslo() {
    this.zmenitHesloVisible = true;
  }

  submitForm() {
    const dialogRef = this.dialog.open(ConfirmEditOfProfileComponent, {
      data: {
        title: 'Potvrzení',
        message: 'Opravdu chcete upravit profil?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Uživatel potvrdil, můžete provést úpravu profilu
        this.performProfileUpdate();
      }
    });
    // Zde můžete implementovat odesílání dat na backend nebo jinou požadovanou logiku
    console.log('Formulář odeslán:');
    console.log('Jméno:', this.name);
    console.log('Příjmení:', this.last_name);
    console.log('Email:', this.email);
    console.log('Obrázek:', this.picture);

  }
  private performProfileUpdate(): void {
    // Zde implementujte skutečné odeslání formuláře nebo úpravu profilu
    console.log('Profil byl úspěšně upraven.');
  }
  storno() {
    this.dialogRef.close();
  }
}
