import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-settledebt',
  templateUrl: './settledebt.component.html',
  styleUrls: ['./settledebt.component.css']
})
export class SettledebtComponent implements OnInit {
  userBalances: any;
  debts: any;

  constructor(private dialogRef: MatDialogRef<SettledebtComponent>, private dataSharingService: DataSharingService) {}

  ngOnInit() {
    // Initialization logic goes here
    console.log('SettledebtComponent initialized');

    this.dataSharingService.shareduserBalances$.subscribe((userBalances) => {
      if (userBalances) {
        this.userBalances = userBalances;
        console.log('User Balances in SettledebtComponent:', this.userBalances);
      }
    }); //TODO

    this.dataSharingService.sharedDebts$.subscribe((debts) => {
      if (debts) {
        this.debts = debts;
        console.log('Debts in SettledebtComponent:', this.debts);
      }
    });//TODO
  }
  // Přidáme metodu pro zavření dialogu
  zavritDialog() {
    this.dialogRef.close();
  }
}
