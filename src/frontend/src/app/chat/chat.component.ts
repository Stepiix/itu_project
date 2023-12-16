import { Component , Input } from '@angular/core';
import { ServiceGroupListService } from '../services/service-group-list.service';
import { DataSharingService } from '../insidegroup/services/data-sharing.service';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



interface ChatMessage {
  message_group_id: number;
  message_user_id: string;
  message_text: string;
  // Další vlastnosti zprávy podle potřeby
}
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() messages: ChatMessage[] = [];
  newMessage: string = '';
  groupId: any;

  constructor(private dataSharingService: DataSharingService,private serviceGroupListService: ServiceGroupListService, private session: SessionService, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {

    this.dataSharingService.sharedId$.subscribe(id => {
      this.groupId = id;
      console.log('Received groupId from addnewpay: ' + this.groupId);
   });


   const groupId = this.groupId; // Nahraď skutečnými hodnotami
   const user_id = this.session.getID() || '';
    this.messages = []; // inicializace prázdného pole
    this.loadMessages(groupId, user_id);
  }

  loadMessages(groupId: number, user_id: string) {
    this.serviceGroupListService.getAllMessages(groupId, user_id).subscribe((messages) => {
      console.log('Získané zprávy:', messages);
      this.messages.push(...messages);
    });
  }

  sendMessage() {
    const newChatMessage: ChatMessage = {
      message_text: this.newMessage,  // předpokládám, že 'message_text' odpovídá obsahu zprávy
      message_group_id: this.groupId,  // nahraď skutečným ID skupiny
      message_user_id: this.session.getID() || '',   // nahraď skutečným ID uživatele
      // další vlastnosti podle potřeby
    };
  
    this.serviceGroupListService.addMessage(newChatMessage).subscribe(() => {
      this.loadMessages(this.groupId, this.session.getID() || '');  // aktualizace zpráv po odeslání nové zprávy
      this.newMessage = '';
    });
  }
  //   this.chatService.addMessage(newChatMessage).subscribe(() => {
  //     this.loadMessages(); // Aktualizuj zprávy po odeslání nové zprávy
  //     this.newMessage = '';
  //   });
  // }
}