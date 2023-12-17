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
  user_id: any;

  constructor(private dataSharingService: DataSharingService,private serviceGroupListService: ServiceGroupListService, private session: SessionService, private router: Router, public dialog: MatDialog) {
    this.user_id = this.session.getID() || '';
  }

  ngOnInit(): void {

    this.dataSharingService.sharedId$.subscribe(id => {
      this.groupId = id;
    });

    const groupId = this.groupId; 
    this.messages = []; 
    this.loadMessages(groupId);
  }

  loadMessages(groupId: number) {
    this.serviceGroupListService.getAllMessages(groupId).subscribe((messages) => {
      // console.log('Získané zprávy:', messages);
      this.messages = messages;
    });
  }

  sendMessage() {
    const newChatMessage: ChatMessage = {
      message_text: this.newMessage,  
      message_group_id: this.groupId, 
      message_user_id: this.session.getID() || '',  
    };
  
    // Odesle dotaz, a obnovi zpravy
    this.serviceGroupListService.addMessage(newChatMessage).subscribe(() => {
      this.newMessage = '';  
      this.loadMessages(this.groupId);
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  // Odstrani zpravu na zaklade ID zpravy
  removeMessage(messageId: number | undefined) { //tady jeste kontrola na to jestli ze muzu odstranit jen zaznamy ktere jsou moje
    if (messageId !== undefined) {
      this.serviceGroupListService.removeMessage(messageId).subscribe(() => {
        this.loadMessages(this.groupId);  // Aktualizace zpráv po odstranění zprávy
      });
    }
  }

}