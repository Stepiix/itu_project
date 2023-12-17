import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedValue = new BehaviorSubject<any>(null);
  private sharedId = new BehaviorSubject<any>(null);
  private groupInfoSource = new BehaviorSubject<any>(null);
  private shareduserBalances = new BehaviorSubject<any>(null);
  private sharedDebts = new BehaviorSubject<any>(null);
  private sharedUserInfo = new BehaviorSubject<any>(null);
  groupInfoUpdated = new EventEmitter<any>();

  sharedValue$ = this.sharedValue.asObservable();
  sharedId$ = this.sharedId.asObservable(); 
  groupInfo$ = this.groupInfoSource.asObservable();
  shareduserBalances$ = this.shareduserBalances.asObservable();
  sharedDebts$ = this.sharedDebts.asObservable();
  sharedUserInfo$ = this.sharedUserInfo.asObservable();

  setSharedValue(value: any): void {
    this.sharedValue.next(value);
  }

  setSharedID(id: any): void {
    this.sharedId.next(id);
  }

  setGroupInfo(groupInfo: any): void {
    this.groupInfoSource.next(groupInfo);
  }
  setBalances(userBalances:any): void{
    this.shareduserBalances.next(userBalances);
  }
  setDebts(debts:any): void{
    this.sharedDebts.next(debts);
  }

  setSharedUserInfo(userInfo: any): void {
    this.sharedUserInfo.next(userInfo);
  }
  getSharedUserInfo(): any {
    return this.sharedUserInfo.value;
  }
  
}
