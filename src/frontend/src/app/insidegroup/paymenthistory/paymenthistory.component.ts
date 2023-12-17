/*
Author: Stepan Barta (xbarta50)
*/
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { ServiceGroupListService } from 'src/app/services/service-group-list.service';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.css']
})
export class PaymenthistoryComponent {
  transactions: any;
  groupId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private grouplistservice: ServiceGroupListService, private router: Router, public dialog: MatDialog, private dialogRef: MatDialogRef<FilterComponent>) {
    this.transactions = data.transactions;
    this.groupId = data.groupId;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteTransaction(transactionID: number): void {

    const transactionRemoval = this.grouplistservice.removeTransaction(transactionID);
    
    transactionRemoval.subscribe(
      (responses) => {
        this.loadTransactions();

      },
      (error) => {
        console.error('Error deleting transaction:', error);
      }
    );
  }

  loadTransactions() {
    this.grouplistservice.loadTransactions(this.groupId).subscribe(
      (data: any) => {
        this.transactions = data.transactions;
      },
      (error) => {
        console.error('Error fetching transactions from backend:', error);
      }
    );
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '400px', 
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
