import { Component } from '@angular/core';
import { ServiceGroupListService } from '../../services/service-group-list.service';
@Component({
  selector: 'app-create-new-group',
  templateUrl: './create-new-group.component.html',
  styleUrls: ['./create-new-group.component.css']
})
export class CreateNewGroupComponent {

  nazev: string = '';
  popis: string = '';
  fotka: string = ''; //tohle zmenit tady bude nejaky file
  constructor(private serviceGroupListService: ServiceGroupListService){}
  vytvoritSkupinu() {
    const groupData = {
      nazev: this.nazev,
      popis: this.popis,
      fotka: this.fotka,
    };
    console.log('Název: ' + this.nazev);
    console.log('Popis: ' + this.popis);
    console.log('Fotka: ' + this.fotka);

        this.serviceGroupListService.createGroup(groupData).subscribe(
      (response) => {
        console.log('Skupina byla vytvořena úspěšně.');
      },
      (error) => {
        console.error('Chyba při vytváření skupiny:', error);
      }
    );
  }

}
