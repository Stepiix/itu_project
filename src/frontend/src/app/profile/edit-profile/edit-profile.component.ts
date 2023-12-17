import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from 'src/app/services/session.service';
import { ConfirmEditOfProfileComponent } from './confirm-edit-of-profile/confirm-edit-of-profile.component';
import { AuthserviceService } from 'src/app/services/authservice.service';
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
  selectedFile: File | null = null;
  selectedImageBase64: string | null = null;

  constructor(private dialogRef: MatDialogRef<EditProfileComponent>, private session: SessionService, private dialog: MatDialog, private authservice: AuthserviceService) {}

  ngOnInit(): void {
    // Tady můžete provádět inicializace nebo načítání dat, pokud je to potřeba při inicializaci komponentu.
    // Například můžete načíst data o uživateli pro úpravu profilu.
    console.log("beru veci ze session")
    this.userInfo = this.session.getUserSession();
  }
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
    this.displayImage(); // Update the image when a new file is selected
  }
  displayImage(): string | null {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
      };
      return this.selectedImageBase64;
    }
    return null;
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
      if (result) {//dal upravit
        // Uživatel potvrdil, můžete provést úpravu profilu
        this.performProfileUpdate();
      } else if (!result){//dal storno
        console.log("profil nebyl upraven protoze dal storno")
      }
    });
  }
  private performProfileUpdate(): void {
    // Prepare user information for update
    const updatedUserInfo = {
      user_id: this.userInfo.userID,
      user_firstname: this.userInfo.firstName,
      user_lastname: this.userInfo.lastName,
      user_email: this.userInfo.email,
      user_photo : this.selectedFile
    };
    console.log('===========',updatedUserInfo)
  
    // Create a FormData object to send both text and file data
    const formData = new FormData();
    formData.append('user_id', updatedUserInfo.user_id.toString());
    formData.append('user_firstname', updatedUserInfo.user_firstname);
    formData.append('user_lastname', updatedUserInfo.user_lastname);
    formData.append('user_email', updatedUserInfo.user_email);
  
    // Check if an image is selected
    if (this.selectedFile) {
      formData.append('user_photo', this.selectedFile, this.selectedFile.name);
    }
  
    // Call editUser method with FormData
    this.authservice.editUser(formData).subscribe(
      (response) => {
        console.log('Profile updated successfully');
        this.session.updateUserSession(updatedUserInfo);
        this.dialogRef.close();
        // Add any additional logic or feedback for successful update
      },
      (error) => {
        console.error('Error updating profile:', error);
        // Handle error, display error message, etc.
      }
    );
  }
  storno() {
    this.dialogRef.close();
  }
}
