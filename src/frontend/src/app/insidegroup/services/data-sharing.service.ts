import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedValue = new BehaviorSubject<any>(null);
  private sharedId = new BehaviorSubject<any>(null);
  private groupInfoSource = new BehaviorSubject<any>(null);
  groupInfoUpdated = new EventEmitter<any>();

  sharedValue$ = this.sharedValue.asObservable();
  sharedId$ = this.sharedId.asObservable(); 
  groupInfo$ = this.groupInfoSource.asObservable();

  setSharedValue(value: any): void {
    this.sharedValue.next(value);
  }

  setSharedID(id: any): void {
    this.sharedId.next(id);
  }

  setGroupInfo(groupInfo: any): void {
    this.groupInfoSource.next(groupInfo);
  }
}
