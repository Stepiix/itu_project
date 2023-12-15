// join-group.component.ts

import { Component } from '@angular/core';
import { ServiceGroupListService } from 'src/app/services/service-group-list.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-join-group',
  templateUrl: './join-group.component.html',
  styleUrls: ['./join-group.component.css']
})
export class JoinGroupComponent {
  link: string = '';
  user_id: string = '';

  constructor(private groupService: ServiceGroupListService, private session: SessionService) {

  }

  pridatSeKeSkupine() {
    // Předpokládáme, že chcete odeslat odkaz, který byl zadaný do vstupu
    console.log("chci se pripojit - ", this.link)
    console.log('moje id je ', this.session.getID);
    this.user_id = this.session.getID() ?? '';
    this.groupService.pridatSeKeSkupine(this.link, this.user_id).subscribe(
      response => {
        console.log('Odpověď z backendu:', response);
        // Zpracujte odpověď z backendu podle potřeby
      },
      error => {
        console.error('Chyba při komunikaci s backendem:', error);
        // Zpracujte chybu podle potřeby
      }
    );
  }
}
