// Author: Milan Takac (xtakac09)

import { Component , Input } from '@angular/core';
import { ServiceGroupListService } from '../services/service-group-list.service';
import { DataSharingService } from '../insidegroup/services/data-sharing.service';
import { SessionService } from './../services/session.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';



interface ChatMessage {
  message_id?: number;
  message_group_id: number;
  message_user_id: string;
  message_text: string;
  user_firstname?:string;
  user_lastname?:string;
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
    this.loadMessages(groupId);
  }

  loadMessages(groupId: number) {
    // this.serviceGroupListService.getAllMessages(groupId, user_id).subscribe((messages) => {
    this.serviceGroupListService.getAllMessages(groupId).subscribe((messages) => {
      console.log('Získané zprávy:', messages);
      this.messages=messages;
    });
  }

  sendMessage() {
    const newChatMessage: ChatMessage = {
 //     message_id: 0,
      message_text: this.newMessage,  // předpokládám, že 'message_text' odpovídá obsahu zprávy
      message_group_id: this.groupId,  // nahraď skutečným ID skupiny
      message_user_id: this.session.getID() || '',   // nahraď skutečným ID uživatele
      // další vlastnosti podle potřeby
    };
  
    this.serviceGroupListService.addMessage(newChatMessage).subscribe(() => {
      // this.loadMessages(this.groupId);  // aktualizace zpráv po odeslání nové zprávy
      this.newMessage = '';  
      this.loadMessages(this.groupId);
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  getLoggedInUserId(): string {
    return this.session.getID() || '';
  }

  removeMessage(messageId: number) {//tady jeste kontrola na to jestli ze muzu odstranit jen zaznamy ktere jsou moje
    if (messageId !== undefined) {
      console.log("nemam id");
    
      this.serviceGroupListService.removeMessage(messageId).subscribe(() => {
        // Aktualizace zpráv po odstranění zprávy
        this.loadMessages(this.groupId);
      });
    }
  }
}