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
  photo: string = ''; //tohle zmenit tady bude nejaky file
  dialogRef: MatDialogRef<CreateNewGroupComponent>;

  constructor(private serviceGroupListService: ServiceGroupListService, private session: SessionService, dialogRef: MatDialogRef<CreateNewGroupComponent>){
    this.dialogRef = dialogRef;
    this.idUser = this.session.getID() || '';
  }
  vytvoritSkupinu() {
    this.idUser = this.session.getID();
    const groupData = {
      group_name: this.name,
      group_label: this.label,
      group_photo: this.photo,
      user_id: this.idUser //dal jsem ti to sem teda to id jak jsi chtel KOKOTE POJEMNOVAVEJ TO NORMALNE idUser != user_id
    };
    console.log('Název: ' + this.name);
    console.log('label: ' + this.label);
    console.log('fotka: ' + this.photo);
    console.log('id uzivatele ktery zaklada skupinu: ' + this.idUser);


        this.serviceGroupListService.createGroup(groupData).subscribe(
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
  

}
