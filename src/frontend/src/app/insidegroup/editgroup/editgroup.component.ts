// editgroup.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { ServiceGroupListService } from 'src/app/services/service-group-list.service';
import { SessionService } from 'src/app/services/session.service';
@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {
  groupInfo: any;
  groupName: string = '';  // Přidáno pro název skupiny
  groupLabel: string = '';  // Přidáno pro popis skupiny
  groupLink: string = '';
  isLinkVisible: boolean = false; 
  userId: any;
  isGroupLeader: boolean = false;
  groupId: any;
  selectedFile: File | null = null;
  selectedImageBase64: string | null = null;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditgroupComponent>,
    private clipboardService: ClipboardService,
    private groupservice: ServiceGroupListService,
    private session: SessionService,
  ) {
    this.groupInfo = data.groupInfo;
    this.groupName = this.groupInfo.group.group_name;  // Předvyplnění hodnoty názvu skupiny
    this.groupLabel = this.groupInfo.group.group_label;  // Předvyplnění hodnoty popisu skupiny
    this.groupLink = this.groupInfo.group.group_link;
    this.groupId = this.groupInfo.group.group_id;
    this.userId = this.session.getID();
  }

  ngOnInit() {
    console.log('Group Info in EditgroupComponent:', this.groupInfo);
    console.log('id skupiny', this.groupInfo.group.group_id)
    console.log('jmeno skupiny', this.groupInfo.group.group_name)
    console.log('popis skupiny', this.groupInfo.group.group_label)
    this.getLeader();
  }

  getLeader() {
    this.groupservice.getLeader(this.groupId).subscribe(
      (data: any) => {
        // Handle the response from the backend
        console.log('Group leader:', data);

        this.isGroupLeader = this.userId === data.user_id;
        console.log('velitel skupiny ano nebo ne',this.isGroupLeader);
      },
      (error) => {
        // Handle errors
        console.error('Error fetching group leader:', error);
      }
    );
  }
  handleFileInput(event: any): void {
    this.selectedFile = event.target.files[0];
    this.displayImage(); // Update the image when a new file is selected
  }
  displayImage(): string | null {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.selectedImageBase64 = reader.result as string;
      };
      return this.selectedImageBase64;
    }
    return null;
  }

  toggleLink() {
    this.isLinkVisible = !this.isLinkVisible;
  }

  copyLink() {
    // Zkopírujte obsah do schránky
    this.clipboardService.copyFromContent(this.groupLink);
  }

  updateGroup() {
    // Convert the selected image to base64 before sending it to the backend
    const imageBase64 = this.selectedImageBase64 ? this.selectedImageBase64.split(',')[1] : null;
  
    this.groupservice.updateGroup(
      this.groupInfo.group.group_id,
      this.groupName,
      this.groupLabel,
      imageBase64  // Add the imageBase64 parameter to the updateGroup method
    ).subscribe(
      (response) => {
        console.log('Group updated successfully:', response);
        this.dialogRef.close();
        
        // Additional actions after a successful update
      },
      (error) => {
        console.error('Error updating group:', error);
        // Actions to be performed after an unsuccessful update
      }
    );
  }

  removeMember(memberId: number): void {
    console.log('id clena ktereho chci vymazat',memberId)
    this.groupservice.removeUserFromGroup(this.groupInfo.group.group_id, memberId)
      .subscribe(
        (response) => {
          console.log('Member removed successfully:', response);
          // Aktualizovat skupinu po odebrání člena
          // this.updateGroupInfo(); ///tohle TODO
        },
        (error) => {
          console.error('Error removing member:', error);
        }
      );
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
