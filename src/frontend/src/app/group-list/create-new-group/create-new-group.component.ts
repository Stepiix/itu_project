import { Component } from '@angular/core';
import { ServiceGroupListService } from '../../services/service-group-list.service';
@Component({
  selector: 'app-create-new-group',
  templateUrl: './create-new-group.component.html',
  styleUrls: ['./create-new-group.component.css']
})
export class CreateNewGroupComponent {

  name: string = '';
  label: string = '';
  photo: string = ''; //tohle zmenit tady bude nejaky file
  constructor(private serviceGroupListService: ServiceGroupListService){}
  vytvoritSkupinu() {
    const groupData = {
      group_name: this.name,
      group_label: this.label,
      group_photo: this.photo,
    };
    console.log('Název: ' + this.name);
    console.log('label: ' + this.label);
    console.log('fotka: ' + this.photo);

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
