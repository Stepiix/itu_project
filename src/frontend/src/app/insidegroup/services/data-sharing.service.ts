import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private sharedValue = new BehaviorSubject<any>(null);
  private sharedId = new BehaviorSubject<any>(null);
  sharedValue$ = this.sharedValue.asObservable();
  sharedId$ = this.sharedId.asObservable(); // Add this line

  setSharedValue(value: any): void {
    this.sharedValue.next(value);
  }

  setSharedID(id: any): void {
    this.sharedId.next(id);
  }
}
