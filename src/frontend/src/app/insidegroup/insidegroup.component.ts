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



  constructor(private router: Router, private route: ActivatedRoute, private groupservice: ServiceGroupListService,  public dialog: MatDialog, private dataSharingService: DataSharingService, private session: SessionService) {}

  ngOnInit() {
    if(!this.session.isLoggedIn()){ // neni prihlaseny
      this.router.navigate(['/login']);
    } else {
      // Předpokládáme, že "groupId" je název parametru z cesty definovaný v trasování
    this.route.params.subscribe(params => {
      this.groupId = params['groupId'];
      console.log('Group ID from route:', this.groupId);
      this.loadInfoAboutGroup(this.groupId);
    });
    this.loadUsersBalances();
    this.loadTransactions();
    this.calculateDebts();
    }
    
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  calculateDebts() {
    this.groupservice.calculateDebts(this.groupId).subscribe(
      (data: any) => {
        console.log('Debts from backend:', data.debts);
        this.debts = this.transformDebts(data.debts);
      },
      (error) => {
        console.error('Error fetching debts from backend:', error);
      }
    );
  }
  transformDebts(rawDebts: any): any {
    const transformedDebts: any = {};
    Object.keys(rawDebts).forEach((debtorId) => {
      const debtorName = this.getUserNameById(parseInt(debtorId)) || ''; // Provide a default value
      const transactions: any = {};
      Object.keys(rawDebts[debtorId]).forEach((payerId) => {
        const payerName = this.getUserNameById(parseInt(payerId)) || ''; // Provide a default value
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
    console.log('----------', this.userId);
  
    if (data && data.group && data.group.users) {
      // Iterate through users in the group
      for (const user of data.group.users) {
        if (user.user_id === this.userId) {
          // User is in the group, should see what is in the group
          console.log("ma pravo na tuto stranku")
          return false;
        }
      }
    }
    console.log('nema pravo na tuto stranku')
    // User is not in the group, should not see what is in the group
    return true;
  }


  loadUsersBalances() {
    this.groupservice.loadUserBalances(this.groupId).subscribe(
      (data: any) => {
        this.userBalances = data.users;
        console.log('User balances from backend:', this.userBalances);
      },
      (error) => {
        console.error('Error fetching user balances from backend:', error);
      }
    );
  }

  loadTransactions() {
    this.groupservice.loadTransactions(this.groupId).subscribe(
      (data: any) => {
        // Zpracování dat z backendu
        this.transactions = data.transactions;
        console.log('Transactions from backend:', this.transactions);
      },
      (error) => {
        console.error('Error fetching transactions from backend:', error);
      }
    );
  }

  loadInfoAboutGroup(id: number) {
    this.groupservice.getInfoAboutGroup(id).subscribe(
      (data: any) => {
        // Zpracování dat z backendu
        if (this.shouldNotSeeWhatIsInThisGroup(data)) {
          this.router.navigate(['']);
        }
        this.groupInfo = data;
        console.log('Data from backend:', this.groupInfo);
        console.log('data o skupine ------ ', this.groupInfo.group);
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
      width: '400px', // Nastavte šířku dialogu dle potřeby
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.loadUsersBalances();
      this.loadTransactions();
      this.calculateDebts();
      // Zde můžete provést akce po zavření dialogu, pokud jsou potřeba
    });
  }

  openDialogSettleDebt(): void {
    const dialogRef = this.dialog.open(SettledebtComponent, {
      width: '400px', // Nastavte šířku dialogu dle potřeby
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Zde můžete provést akce po zavření dialogu, pokud jsou potřeba
    });
  }

openDialogEditGroup(): void {
  const dialogRef = this.dialog.open(EditgroupComponent, {
    width: '400px', // Nastavte šířku dialogu dle potřeby
    data: { groupInfo: this.groupInfo }, // Předejte data dialogu
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.loadInfoAboutGroup(this.groupId);
    // Zde můžete provést akce po zavření dialogu, pokud jsou potřeba
  });
}


  openDialogPaymentHistory(): void {
    const dialogRef = this.dialog.open(PaymenthistoryComponent, {
      width: '400px', // Nastavte šířku dialogu dle potřeby
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Zde můžete provést akce po zavření dialogu, pokud jsou potřeba
    });
  }

}
