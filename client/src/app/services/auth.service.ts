import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Rx";
import { Http, Response } from "@angular/http";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  
  BASE_URL: string = "http://localhost:3000";
  user: Object;
  userEvent: EventEmitter<any> = new EventEmitter();
  options: Object = { withCredentials: true };

  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  handleUser(user?: object) {
    this.user = user;
    this.userEvent.emit(this.user);
    return this.user;
  }

  signUp(user) {
    return this.http
      .post(`${environment.BASE_URL}/api/auth/signup`, user, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }

  logIn(username, password) {
    return this.http
      .post(`${environment.BASE_URL}/api/auth/login`, {username, password}, this.options)
      .map(res => res.json())
      .map(user =>  this.handleUser(user))
      .catch(this.handleError);
  }

  logOut() {
    return this.http
      .get(`${environment.BASE_URL}/api/auth/logout`, this.options)
      .map(res => res.json())
      .map(() => this.handleUser())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http
      .get(`${environment.BASE_URL}/api/auth/loggedin`, this.options)
      .map(res => res.json())
      .map(user => this.handleUser(user))
      .catch(this.handleError);
  }
}
