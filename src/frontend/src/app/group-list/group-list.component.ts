import { Component, OnInit } from '@angular/core';
import { ServiceGroupListService } from '../services/service-group-list.service';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  groups: any[] = [];

  constructor(private serviceGroupListService: ServiceGroupListService, private session: SessionService, private router: Router) {}
  
  ngOnInit() {
    if(!this.session.isLoggedIn()){
      this.router.navigate(['/login'])
    }
    this.loadGroups();
  }
  
  loadGroups() {
    this.serviceGroupListService.getGroups().subscribe(
      (data) => {
        this.groups = data;
        console.log("tady musis zobrazit skupiny " + this.groups);
      },
      (error) => {
        console.error('Error loading groups', error);
      }
    );
  }
}
