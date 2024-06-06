import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './common/api-service';

const API_URL = 'users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private api: ApiService) {}

  getUsers(): Observable<any> {
    return this.api.getData(API_URL);
  }

  AddUser(data: any): Observable<any> {
    return this.api.postData(API_URL, data);
  }
}
