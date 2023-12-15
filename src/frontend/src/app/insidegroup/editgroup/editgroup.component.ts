// editgroup.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-editgroup',
  templateUrl: './editgroup.component.html',
  styleUrls: ['./editgroup.component.css']
})
export class EditgroupComponent implements OnInit {
  groupLink: string = '';
  isLinkVisible: boolean = false; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clipboardService: ClipboardService
  ) {}

  ngOnInit() {
    this.data.groupLink.subscribe((value: string) => {
      this.groupLink = value;
    });
  }

  toggleLink() {
    this.isLinkVisible = !this.isLinkVisible;
  }

  copyLink() {
    // Zkopírujte obsah do schránky
    this.clipboardService.copyFromContent(this.groupLink);
  }
}
