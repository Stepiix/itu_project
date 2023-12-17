/*
Author: Stepan Barta (xbarta50)
*/
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
  selectedUserId: number = 0;
  paymentAmount: number = 0; 
  paymentReason: string = '';
  userShares: { [userId: number]: number } = {};
  isButtonEnabled: boolean = false;
  isAmountSelected: boolean = true;  
  isRatioSelected: boolean = false;  
  constructor(private dataSharingService: DataSharingService, private grouplistservice: ServiceGroupListService,private dialogRef: MatDialogRef<AddnewpayComponent>){}


  ngOnInit(): void {
    this.dataSharingService.sharedValue$.subscribe(value => {
      this.personInfo = value;
    });
    this.dataSharingService.sharedId$.subscribe(id => {
      this.groupId = id;
   });
  }
  checkButtonAvailability() {

  const isUserIdValid = this.selectedUserId && !isNaN(this.selectedUserId);


  const isPaymentAmountValid = this.paymentAmount && !isNaN(this.paymentAmount) && this.paymentAmount > 0;


    if (this.isAmountSelected) {
        const totalShares = Object.values(this.userShares).reduce((acc, share) => acc + share, 0);
        this.isButtonEnabled = !!(totalShares === this.paymentAmount && isUserIdValid && isPaymentAmountValid);
    } else if (this.isRatioSelected) {

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
  this.checkButtonAvailability(); 
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
  
    const paymentRequests = [];
  
    for (const userId in this.userShares) {
      let userShare = this.userShares[userId];
      if (userShare !== null && !isNaN(userShare) && userShare > 0) {
        if(this.isRatioSelected){
          userShare = Math.round(this.paymentAmount * (userShare / 100));
        }
        const numericUserId = parseInt(userId, 10); 
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
  

    const combinedRequest = forkJoin(paymentRequests);
  

    combinedRequest.subscribe(
      (responses) => {

        this.dialogRef.close();
      },
      (error) => {

        console.error('Error during payments:', error);

      }
    );
  }

}
