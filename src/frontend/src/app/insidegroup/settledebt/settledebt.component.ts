/*
Author: Stepan Barta (xbarta50)
*/
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

    this.dataSharingService.shareduserBalances$.subscribe((userBalances) => {
      if (userBalances) {
        this.userBalances = userBalances;
      }
    });

    this.dataSharingService.sharedDebts$.subscribe((debts) => {
      if (debts) {
        this.debts = debts;
        this.updateMyUserName();
      }
    });

    this.dataSharingService.sharedId$.subscribe(id => {
      this.groupId = id;
   });

    this.userID = this.session.getID();
    this.updateMyUserName();
  }

  updateMyUserName() {
    if (this.userID && this.userBalances) {
      const myUser = this.userBalances.find((user: any) => user.user_id === this.userID);
      if (myUser) {
        this.myUserName = myUser.user_firstname;
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
          console.log('Debt settlement successful:', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error settling debt:', error);
        }
      );
    }
  }
  
}
