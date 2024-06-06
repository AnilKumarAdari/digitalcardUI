import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './common/api-service';
import { StorageService } from './storage.service';

const AUTH_API = 'auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private api: ApiService,
    private storageService: StorageService
  ) {}

  login(userName: string, password: string): Observable<any> {
    return this.api
      .postData(AUTH_API + 'login', {
        userName,
        password,
      })
      .pipe(
        tap((data) => {
          this.storageService.saveUser(data);
          this.loggedIn.next(true);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.api.postData(AUTH_API + 'signup', {
      username,
      email,
      password,
    });
  }

  logout(): void {
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLogin(val: boolean) {
    this.loggedIn.next(val);
  }
}
