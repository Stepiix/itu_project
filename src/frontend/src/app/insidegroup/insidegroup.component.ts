import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ServiceGroupListService } from '../services/service-group-list.service';
import { MatDialog } from '@angular/material/dialog';
import { AddnewpayComponent } from './addnewpay/addnewpay.component';
import { EditgroupComponent } from './editgroup/editgroup.component';
import { PaymenthistoryComponent } from './paymenthistory/paymenthistory.component';
import { SettledebtComponent } from './settledebt/settledebt.component';
@Component({
  selector: 'app-insidegroup',
  templateUrl: './insidegroup.component.html',
  styleUrls: ['./insidegroup.component.css']
})
export class InsidegroupComponent {
  groupInfo: any;

  constructor(private router: Router, private route: ActivatedRoute, private groupservice: ServiceGroupListService,  public dialog: MatDialog) {}

  ngOnInit() {
    // Předpokládáme, že "groupId" je název parametru z cesty definovaný v trasování
    this.route.params.subscribe(params => {
      const groupId = params['groupId'];
      console.log('Group ID from route:', groupId);
  
      this.loadInfoAboutGroup(groupId);
    });

    
  }

  loadInfoAboutGroup(id: number) {
    this.groupservice.getInfoAboutGroup(id).subscribe(
      (data: any) => {
        // Zpracování dat z backendu
        this.groupInfo = data;
        console.log('Data from backend:', this.groupInfo);
      },
      (error) => {
        console.error('Error fetching data from backend:', error);
      }
    );
  }

  openDialogAddNewPay(): void {
    const dialogRef = this.dialog.open(AddnewpayComponent, {
      width: '400px', // Nastavte šířku dialogu dle potřeby
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
