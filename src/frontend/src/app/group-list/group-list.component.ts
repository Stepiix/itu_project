import { Component, OnInit } from '@angular/core';
import { ServiceGroupListService } from '../services/service-group-list.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent {
  groups: any[] = [];

  constructor(private serviceGroupListService: ServiceGroupListService) {}
  
  ngOnInit() {
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
