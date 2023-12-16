import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataSharingService } from '../services/data-sharing.service';
import { ServiceGroupListService } from 'src/app/services/service-group-list.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-addnewpay',
  templateUrl: './addnewpay.component.html',
  styleUrls: ['./addnewpay.component.css']
})
export class AddnewpayComponent implements OnInit{
  personInfo: any;
  groupId: any;
  selectedUserId: number = 0; // Inicializační hodnota
  paymentAmount: number = 0; // Inicializační hodnota
  paymentReason: string = '';
  userShares: { [userId: number]: number } = {};
  isButtonEnabled: boolean = false;
  isAmountSelected: boolean = true;  // Defaultní výběr "Částky"
  isRatioSelected: boolean = false;  // Přepnutí na "Poměr"
  constructor(private dataSharingService: DataSharingService, private grouplistservice: ServiceGroupListService,private dialogRef: MatDialogRef<AddnewpayComponent>){}


  ngOnInit(): void {
    this.dataSharingService.sharedValue$.subscribe(value => {
      this.personInfo = value;
      console.log('posilam pozdrav z addnewpay' + this.personInfo.group);
    });
    this.dataSharingService.sharedId$.subscribe(id => {
      this.groupId = id;
      console.log('Received groupId from addnewpay: ' + this.groupId);
   });
  }
  checkButtonAvailability() {
    // Check if selected user ID is valid
  const isUserIdValid = this.selectedUserId && !isNaN(this.selectedUserId);

  // Check if payment amount is a number greater than zero
  const isPaymentAmountValid = this.paymentAmount && !isNaN(this.paymentAmount) && this.paymentAmount > 0;

    // Zkontrolovat, zda jsou všechny podíly vyplněny a rovnají se zadané částce
    if (this.isAmountSelected) {
        const totalShares = Object.values(this.userShares).reduce((acc, share) => acc + share, 0);
        this.isButtonEnabled = !!(totalShares === this.paymentAmount && isUserIdValid && isPaymentAmountValid);
    } else if (this.isRatioSelected) {
        // Zkontrolovat, zda je součet všech podílů roven 100
        const totalRatios = Object.values(this.userShares).reduce((acc, ratio) => acc + ratio, 0);
        this.isButtonEnabled = !!(totalRatios === 100 && isUserIdValid && isPaymentAmountValid);
    }
}
splitEqually() {
  if (this.isAmountSelected) {
    const numberOfUsers = this.personInfo.group.users.length;
    const amountPerUser = Math.floor(this.paymentAmount / numberOfUsers);
    const remainingAmount = this.paymentAmount - (amountPerUser * numberOfUsers);

    this.personInfo.group.users.forEach((user: any, index: number) => {
      this.userShares[user.user_id] = amountPerUser + (index < remainingAmount ? 1 : 0);
    });
  } else if (this.isRatioSelected) {
    const numberOfUsers = this.personInfo.group.users.length;
    const totalPercentage = 100;
    const percentagePerUser = Math.floor(totalPercentage / numberOfUsers);
    const remainingPercentage = totalPercentage - (percentagePerUser * numberOfUsers);

    this.personInfo.group.users.forEach((user: any, index: number) => {
      this.userShares[user.user_id] = percentagePerUser + (index < remainingPercentage ? 1 : 0);
    });
  }
  this.checkButtonAvailability(); // Aktualizovat dostupnost tlačítka
}


  isAmountButtonActive(): boolean {
    return this.isAmountSelected;
  }

  isRatioButtonActive(): boolean {
    return this.isRatioSelected;
  }

  onAmountClick(): void {
    this.isAmountSelected = true;
    this.isRatioSelected = false;
    this.checkButtonAvailability();
  }

  onRatioClick(): void {
    this.isAmountSelected = false;
    this.isRatioSelected = true;
    this.checkButtonAvailability();
  }

  zavritDialog() {
    this.dialogRef.close();
  }
  

  confirmPayment() {
    if (!this.isButtonEnabled) {
      console.log('Cannot confirm payment. Please ensure all fields are valid.');
      return;
    }
  
    // Zde provedete akce potvrzení platby
    console.log('Platba potvrzena!');
  
    // Log information from the form
    console.log('Selected User ID:', this.selectedUserId);
    console.log('Payment Amount:', this.paymentAmount);
    console.log('Payment Reason:', this.paymentReason);
    console.log('User Shares:', this.userShares);
    console.log('Is Button Enabled:', this.isButtonEnabled);
  
    // Uložte si pole všech requestů
    const paymentRequests = [];
  
    // Iterate over each user share and send a request
    for (const userId in this.userShares) {
      const userShare = this.userShares[userId];
      if (userShare !== null && !isNaN(userShare) && userShare > 0) {
        const numericUserId = parseInt(userId, 10); // Convert userId to integer
        const paymentRequest = this.grouplistservice.sendNewPay(
          this.groupId,
          this.selectedUserId,
          numericUserId,
          userShare,
          'czk',
          '123',
          this.paymentReason,
          '1.1.2024'
        );
        paymentRequests.push(paymentRequest);
      }
    }
  
    // Vytvořte jeden request, který bude čekat na dokončení všech asynchronních operací
    const combinedRequest = forkJoin(paymentRequests);
  
    // Předpokládáme, že combinedRequest je Observable, takže můžeme na něj subscribe
    combinedRequest.subscribe(
      (responses) => {
        // Všechny platby byly úspěšně provedeny
        console.log('All payments were successful:', responses);
        // Uzavřeme dialog
        this.dialogRef.close();
      },
      (error) => {
        // Něco se pokazilo při provádění platby
        console.error('Error during payments:', error);
        // Můžete přidat vhodné chování zde
      }
    );
  }
  
  

  //takhle good

}
