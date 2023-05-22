import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from './users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:1800/api/user'; // Backend URL

  getUser(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseUrl}`);
  }

  AddEditUser(
    postData: any,
    selectedUser: any //türünü fark etmez
  ) {
    if (!selectedUser) {
      return this.http.post(`${this.baseUrl}`, postData);
    } else {
      return this.http.put(`${this.baseUrl}/${selectedUser.id}`, postData);
    }
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}
