import { Component } from '@angular/core';
import { MatDialog, MatDialogRef  } from '@angular/material/dialog';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-paymenthistory',
  templateUrl: './paymenthistory.component.html',
  styleUrls: ['./paymenthistory.component.css']
})
export class PaymenthistoryComponent {
  transactions: any;
  groupId: any;

  constructor(public dialog: MatDialog, private dialogRef: MatDialogRef<FilterComponent>) {}

  ngOnInit() {  // TODO
    // this.route.params.subscribe(params => {
    // this.groupId = params['groupId'];
    // this.loadTransactions();
    // });
    console.log()
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '400px', // Nastavte šířku dialogu dle potřeby
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The filter dialog was closed');
      // Zde můžete provést akce po zavření dialogu, pokud jsou potřeba
    });
  }

}
