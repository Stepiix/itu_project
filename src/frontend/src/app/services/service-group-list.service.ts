import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGroupListService {
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  getGroups(userId: string): Observable<any> {
    const apiUrlWithUserId = `${this.apiUrl}groups?userId=${userId}`;
    return this.http.get(apiUrlWithUserId);
  }

  createGroup(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}create-group`, formData);
  }
  
  getInfoAboutGroup(groupId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}group?group_id=${groupId}`);
  }

  sendNewPay(groupId: number, selectedUserId: number, userId: number, userShare: number, currency: string, exchangeRate: string, paymentReason: string, date: string): Observable<any> {
    const paymentData = {
      t_group_id: groupId,
      t_user_payer_id: selectedUserId,
      t_user_debtor_id: userId,
      t_amount: userShare,
      t_currency: currency,
      t_exchange_rate: exchangeRate,
      t_label: paymentReason,
    };

    // Return the observable without subscribing here
    return this.http.post(`${this.apiUrl}create-transactions`, paymentData);
  }

  loadTransactions(groupId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}getall-transactions?t_group_id=${groupId}`);
  }
}
