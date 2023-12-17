/*
Author: Tomas Valik (xvalik04)
*/
import { Component, OnInit } from '@angular/core';
import { ServiceGroupListService } from '../services/service-group-list.service';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewGroupComponent } from '../group-list/create-new-group/create-new-group.component';
import { JoinGroupComponent } from './join-group/join-group.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  groups: any[] = [];

  constructor(private serviceGroupListService: ServiceGroupListService, private session: SessionService, private router: Router, public dialog: MatDialog) {}
  
  ngOnInit() {
    if(!this.session.isLoggedIn()){
      this.router.navigate(['/login'])
    } else {
      this.loadGroups();
    }
  }
  
  loadGroups() {
    const userId = this.session.getID();
    
    if (userId !== null) {
      console.log("Userovo ID je: " + userId);
  
      this.serviceGroupListService.getGroups(userId).subscribe(
        (data) => {
          this.groups = data;
          console.log("Tady jsou informace o skupinách:", this.groups);
        },
        (error) => {
          console.error('Error loading groups', error);
        }
      );
    } else {
      console.error('User ID is null');
    }
  }

  openCreateGroup(): void {
    const dialogRef = this.dialog.open(CreateNewGroupComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog zavřen');
      this.loadGroups();
    });
  }

  openJoinGroup(): void {
    const dialogRef = this.dialog.open(JoinGroupComponent, {
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog zavřen');
      this.loadGroups();
    });
  }
  showGroupId(groupId: number) {
    console.log('Clicked on group with ID:', groupId);
    this.router.navigate(['/group', groupId]);
  }
}
