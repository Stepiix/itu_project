
/*
Authors: Tomas Valik (xvalik04)
         Stepan Barta (xbarta50)
         Milan Takac (xtakac09)
*/

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServiceGroupListService } from '../services/service-group-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddnewpayComponent } from './addnewpay/addnewpay.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { PaymenthistoryComponent } from './paymenthistory/paymenthistory.component';
import { SettledebtComponent } from './settledebt/settledebt.component';
import { DataSharingService } from './services/data-sharing.service';
import { SessionService } from '../services/session.service';
import { ChatComponent } from '../chat/chat.component';
@Component({
  selector: 'app-insidegroup',
  templateUrl: './insidegroup.component.html',
  styleUrls: ['./insidegroup.component.css']
})
export class InsidegroupComponent {
  groupInfo: any;
  groupId: any;
  transactions: any;
  userBalances: any;
  userId: any;
  debts: { [debtorName: string]: { [payerName: string]: number } } = {};
  isGroupLeader: boolean = false;



  constructor(private router: Router, private route: ActivatedRoute, private groupservice: ServiceGroupListService,  public dialog: MatDialog, private dataSharingService: DataSharingService, private session: SessionService) {
    this.userId = this.session.getID();
  }

  ngOnInit() {
    if(!this.session.isLoggedIn()){
      this.router.navigate(['/login']);
    } else {
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      this.loadInfoAboutGroup(this.groupId);
    });
    this.getLeader();
    this.loadUsersBalances();
    this.loadTransactions();
    this.calculateDebts();
    }
    
  }
  getLeader() {
    this.groupservice.getLeader(this.groupId).subscribe(
      (data: any) => {

        this.isGroupLeader = this.userId === data.user_id;
      },
      (error) => {
        console.error('Error fetching group leader:', error);
      }
    );
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  calculateDebts() {
    this.groupservice.calculateDebts(this.groupId).subscribe(
      (data: any) => {
        this.debts = this.transformDebts(data.debts);
        this.dataSharingService.setDebts(this.debts);
      },
      (error) => {
        console.error('Error fetching debts from backend:', error);
      }
    );
  }
  transformDebts(rawDebts: any): any {
    const transformedDebts: any = {};
    Object.keys(rawDebts).forEach((debtorId) => {
      const debtorName = this.getUserNameById(parseInt(debtorId)) || '';
      const transactions: any = {};
      Object.keys(rawDebts[debtorId]).forEach((payerId) => {
        const payerName = this.getUserNameById(parseInt(payerId)) || '';
        transactions[payerName] = rawDebts[debtorId][payerId];
      });
      transformedDebts[debtorName] = transactions;
    });
    return transformedDebts;
  }
  getUserNameById(userId: number): string | undefined {
    const user = this.userBalances.find((userBalance: any) => userBalance.user_id === userId);
    return user ? user.user_firstname : undefined;
  }

  shouldNotSeeWhatIsInThisGroup(data: any) {
    this.userId = this.session.getID();
  
    if (data && data.group && data.group.users) {
      for (const user of data.group.users) {
        if (user.user_id === this.userId) {
          return false;
        }
      }
    }
    return true;
  }


  loadUsersBalances() {
    this.groupservice.loadUserBalances(this.groupId).subscribe(
      (data: any) => {
        this.userBalances = data.users;
        this.dataSharingService.setBalances(this.userBalances);
      },
      (error) => {
        console.error('Error fetching user balances from backend:', error);
      }
    );
  }

  loadTransactions() {
    this.groupservice.loadTransactions(this.groupId).subscribe(
      (data: any) => {
        this.transactions = data.transactions;
      },
      (error) => {
        console.error('Error fetching transactions from backend:', error);
      }
    );
  }

  loadInfoAboutGroup(id: number) {
    this.groupservice.getInfoAboutGroup(id).subscribe(
      (data: any) => {
        if (this.shouldNotSeeWhatIsInThisGroup(data)) {
          this.router.navigate(['']);
        }
        this.groupInfo = data;
        this.dataSharingService.setGroupInfo(this.groupInfo.group);
      },
      (error) => {
        console.error('Error fetching data from backend:', error);
      }
    );
  }

  loadPeopleForAddNewPay(){
    return this.groupInfo;
  }

  openDialogAddNewPay(): void {
    this.dataSharingService.setSharedValue(this.groupInfo);
    this.dataSharingService.setSharedID(this.groupId);

    const dialogRef = this.dialog.open(AddnewpayComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container', 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loadUsersBalances();
      this.loadTransactions();
      this.calculateDebts();
    });
  }

  openDialogSettleDebt(): void {
    this.dataSharingService.setSharedID(this.groupId);
    const dialogRef = this.dialog.open(SettledebtComponent, {
      panelClass: 'custom-dialog-container',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loadUsersBalances();
      this.loadTransactions();
      this.calculateDebts();
    });
  }

openDialogEditGroup(): void {
  const dialogRef = this.dialog.open(EditgroupComponent, {
    panelClass: 'custom-dialog-container',
    data: { groupInfo: this.groupInfo },
  });

  dialogRef.afterClosed().subscribe(result => {
    this.loadInfoAboutGroup(this.groupId);
  });
}


  openDialogPaymentHistory(): void {
    const dialogRef = this.dialog.open(PaymenthistoryComponent, {
      data: { transactions : this.transactions, groupId:this.groupId },
      panelClass: 'custom-dialog-container',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loadTransactions();
    });
  }

  openChat(): void {
    this.dataSharingService.setSharedID(this.groupId);
    const dialogRef = this.dialog.open(ChatComponent, {
      width: '1000px',
      panelClass: 'custom-dialog-container',
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
