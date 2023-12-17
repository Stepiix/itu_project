import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';
import { SessionService } from 'src/app/services/session.service';
import { ServiceGroupListService } from 'src/app/services/service-group-list.service';
@Component({
  selector: 'app-settledebt',
  templateUrl: './settledebt.component.html',
  styleUrls: ['./settledebt.component.css']
})
export class SettledebtComponent implements OnInit {
  userBalances: any;
  debts: any;
  currentUserDebts: any[] = [];
  userID: any;
  myUserName: string = '';
  selectedDebt: any;
  groupId:any;
  selectedDebtAmount: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<SettledebtComponent>,
    private dataSharingService: DataSharingService,
    private session: SessionService,
    private groupservice: ServiceGroupListService
  ) {}

  ngOnInit() {
    console.log('SettledebtComponent initialized');

    this.dataSharingService.shareduserBalances$.subscribe((userBalances) => {
      if (userBalances) {
        this.userBalances = userBalances;
        console.log('User Balances in SettledebtComponent:', this.userBalances);
      }
    });

    this.dataSharingService.sharedDebts$.subscribe((debts) => {
      if (debts) {
        this.debts = debts;
        console.log('Debts in SettledebtComponent:', this.debts);
        this.updateMyUserName();
      }
    });

    this.dataSharingService.sharedId$.subscribe(id => {
      this.groupId = id;
      console.log('Received groupId from addnewpay: ' + this.groupId);
   });

    this.userID = this.session.getID();
    console.log('IDDDDDDDDDDDDDDDDDDDD - ', this.userID);
    this.updateMyUserName();
  }

  updateMyUserName() {
    if (this.userID && this.userBalances) {
      const myUser = this.userBalances.find((user: any) => user.user_id === this.userID);
      if (myUser) {
        this.myUserName = myUser.user_firstname;
        console.log('My User Name:', this.myUserName);
        this.updateCurrentUserDebts();
      }
    }
  }

  updateCurrentUserDebts() {
    if (this.myUserName && this.debts && this.debts[this.myUserName]) {
      this.currentUserDebts = Object.entries(this.debts[this.myUserName]).map(([key, value]) => ({
        name: key,
        value: value
      }));
      console.log('Current User Debts:', this.currentUserDebts);
    }
  }

  getDebtAmount(selectedDebt: any): string {
    const debt = this.currentUserDebts.find((debt) => debt.name === selectedDebt);
    return debt ? debt.value.toString() : 'N/A';
  }
  setAmountForSelectedDebt() {
    if (this.selectedDebt) {
      const debt = this.currentUserDebts.find((debt) => debt.name === this.selectedDebt);
      this.selectedDebtAmount = debt ? debt.value : null;
    }
  }

  zavritDialog() {
    this.dialogRef.close();
  }

  srovnatDluh() {
    if (this.selectedDebt && this.selectedDebtAmount !== null) {
      const selectedUserId = this.userBalances.find((user: any) => user.user_firstname === this.selectedDebt)?.user_id;
  
      if (selectedUserId) {
        // Do something with the selected user ID and amount
        console.log('Selected User ID:', selectedUserId);
        console.log('Selected Debt Amount:', this.selectedDebtAmount);
      }
  
      const settleDebtRequest = this.groupservice.sendNewPay(
        this.groupId,
        this.userID.toString(),
        selectedUserId,
        this.selectedDebtAmount,
        'czk'.toString(),
        '123'.toString(),
        ''.toString(),
        '1.1.2024'.toString()
      );
  
      settleDebtRequest.subscribe(
        (response) => {
          // Request was successful
          console.log('Debt settlement successful:', response);
          this.dialogRef.close();
        },
        (error) => {
          // Something went wrong with the request
          console.error('Error settling debt:', error);
          // You can add appropriate behavior here
        }
      );
    }
  }
  
}
