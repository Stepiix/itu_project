/*
Author: Tomas Valik (xvalik04)
*/
import { Component } from '@angular/core';
import { ServiceGroupListService } from 'src/app/services/service-group-list.service';
import { SessionService } from 'src/app/services/session.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent {
  link: string = '';
  user_id: string = '';

  constructor(private groupService: ServiceGroupListService, private session: SessionService,private dialogRef: MatDialogRef<JoinGroupComponent>) {

  }

  pridatSeKeSkupine() {
    this.user_id = this.session.getID() ?? '';
    this.groupService.pridatSeKeSkupine(this.link, this.user_id).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {
        alert('neco se nepovedlo')
      }
    );
  }
  zavritDialog() {
    this.dialogRef.close();
  }
}
