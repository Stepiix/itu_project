/*
Author: Tomas Valik (xvalik04)
*/

import { Component } from '@angular/core';
import { ServiceGroupListService } from '../../services/service-group-list.service';
import { SessionService } from 'src/app/services/session.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-new-group',
  templateUrl: './create-new-group.component.html',
  styleUrls: ['./create-new-group.component.css']
})
export class CreateNewGroupComponent {
  idUser: string | null;
  name: string = '';
  label: string = '';
  selectedFile: File | null = null;
  dialogRef: MatDialogRef<CreateNewGroupComponent>;
  selectedImageBase64: string | null = null;

  constructor(private serviceGroupListService: ServiceGroupListService, private session: SessionService, dialogRef: MatDialogRef<CreateNewGroupComponent>){
    this.dialogRef = dialogRef;
    this.idUser = this.session.getID() || '';
  }
  vytvoritSkupinu(): void {
    this.idUser = this.session.getID();

    const formData = new FormData();
    formData.append('group_name', this.name);
    formData.append('group_label', this.label);

    if (this.selectedFile !== null) {
      formData.append('group_photo', this.selectedFile, this.selectedFile.name);
    }

    // Check if idUser is not null before appending
    if (this.idUser !== null) {
      formData.append('user_id', this.idUser);
    }

    this.serviceGroupListService.createGroup(formData).subscribe(
      (response) => {
        console.log('Skupina byla vytvořena úspěšně.');
      },
      (error) => {
        console.error('Chyba při vytváření skupiny:', error);
      }
    );
    this.dialogRef.close();
  }
  zavritDialog(): void {
    this.dialogRef.close();
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
  

}
