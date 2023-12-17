/*
Author: Tomas Valik (xvalik04)
*/
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
  groupName: string = '';  
  groupLabel: string = '';  
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
    this.groupName = this.groupInfo.group.group_name;  
    this.groupLabel = this.groupInfo.group.group_label;
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
    this.clipboardService.copyFromContent(this.groupLink);
  }

  updateGroup() {
    const formData = new FormData();
    formData.append('group_id', this.groupInfo.group.group_id.toString());
    formData.append('group_name', this.groupName);
    formData.append('group_label', this.groupLabel);
    if (this.selectedFile) {
      formData.append('group_photo', this.selectedFile, this.selectedFile.name);
    }
  
    this.groupservice.updateGroup(formData).subscribe(
      (response) => {
        console.log('Group updated successfully:', response);
        this.dialogRef.close();
  
      },
      (error) => {
        console.error('Error updating group:', error);
       }
    );
  }

  removeMember(memberId: number): void {
    console.log('id clena ktereho chci vymazat',memberId)
    this.groupservice.removeUserFromGroup(this.groupInfo.group.group_id, memberId)
      .subscribe(
        (response) => {
          console.log('Member removed successfully:', response);
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
