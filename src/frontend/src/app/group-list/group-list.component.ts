import { Component, OnInit } from '@angular/core';
import { ServiceGroupListService } from '../services/service-group-list.service';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateNewGroupComponent } from '../group-list/create-new-group/create-new-group.component'; // Vytvořte komponentu pro dialog
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
    if(!this.session.isLoggedIn()){ // neni prihlaseny
      this.router.navigate(['/login'])
    } else { // je prihlaseny
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
      width: '400px',
      // Další možnosti konfigurace dialogu
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog zavřen');
      // Zde můžete zpracovat výsledek dialogu (pokud potřebujete)
    });
  }

  openJoinGroup(): void {
    const dialogRef = this.dialog.open(JoinGroupComponent, {
      width: '400px',
      // Další možnosti konfigurace dialogu
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog zavřen');
      // Zde můžete zpracovat výsledek dialogu (pokud potřebujete)
    });
  }
  showGroupId(groupId: number) {
    console.log('Clicked on group with ID:', groupId);
    // Zde můžete provést další akce s ID skupiny, např. získání dat této skupiny nebo navigace na jinou stránku.
    this.router.navigate(['/group', groupId]);
  }
}
