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
    console.log('posilam na backend ----------------',paymentData)

    // Return the observable without subscribing here
    return this.http.post(`${this.apiUrl}create-transactions`, paymentData);
  }

  loadTransactions(groupId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}getall-transactions?t_group_id=${groupId}`);
  }

  pridatSeKeSkupine(link: string, userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}group-invite/${link}?user_id=${userId}`);
  }

  updateGroup(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}update-group`, formData);
  }

  getAllMessages(groupId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}all-messages/${groupId}`);
  }
  // getAllMessages(groupId: number, user_id: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}all-messages?group_id=${groupId}&user_id=${user_id}`);
  // }

  addMessage(newChatMessage: any): Observable<any> {
    return this.http.post(`${this.apiUrl}add-message`, newChatMessage);
  }
  
  removeMessage(messageId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}remove-message/${messageId}`);
  }

  removeUserFromGroup(groupId: number, userId: number): Observable<any> {
    const removeUserData = {
      group_id: groupId,
      user_id: userId,
    };
    console.log('tohle posilam na backend po delete',removeUserData)

    // Return the observable without subscribing here
    return this.http.delete(`${this.apiUrl}group-remove-user`, { body: removeUserData });
  }

  loadUserBalances(groupId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}group-balance?group_id=${groupId}`);
  }

  calculateDebts(groupId: number): Observable<any> {
    const requestData = {
      group_id: groupId,
    };
  
    // Return the observable without subscribing here
    return this.http.get(`${this.apiUrl}group-depts`, { params: requestData });
  }

  getLeader(groupId: number): Observable<any> {
    // Assuming the backend endpoint is '/group-leader'
    const apiUrl = `${this.apiUrl}group-leader?group_id=${groupId}`;
  
    // Return the observable without subscribing here
    return this.http.get(apiUrl);
  }
  
}
