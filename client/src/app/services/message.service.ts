import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from '../../environments/environment';

@Injectable()
export class MessageService {
  BASE_URL = "http://localhost:3000";
  options: Object = { withCredentials: true };
  constructor(private http: Http) {}

  getList() {
    return this.http
      .get(`${environment.BASE_URL}/api/message`, this.options)
      .map(res => res.json());
  }
}
