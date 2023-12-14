import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServiceGroupListService } from '../services/service-group-list.service';
@Component({
  selector: 'app-insidegroup',
  templateUrl: './insidegroup.component.html',
  styleUrls: ['./insidegroup.component.css']
})
export class InsidegroupComponent {
  constructor(private router: Router, private route: ActivatedRoute, private groupservice: ServiceGroupListService) {}

  ngOnInit() {
    // Předpokládáme, že "groupId" je název parametru z cesty definovaný v trasování
    this.route.params.subscribe(params => {
      const groupId = params['groupId'];
      console.log('Group ID from route:', groupId);
  
      this.loadInfoAboutGroup(groupId);
    });

    
  }

  loadInfoAboutGroup(id: number) {
    this.groupservice.getInfoAboutGroup(id).subscribe(
      (data: any) => {
        // Zpracování dat z backendu
        console.log('Data from backend:', data);
      },
      (error) => {
        console.error('Error fetching data from backend:', error);
      }
    );
  }

}
