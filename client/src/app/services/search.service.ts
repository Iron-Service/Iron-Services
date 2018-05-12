import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class SearchService {
  BASE_URL = "http://localhost:3000";
  options: Object = { withCredentials: true };

  constructor(private http: Http) {}

  getList() {
    return this.http.get(`${this.BASE_URL}/`, this.options)
    .map(res => res.json());
  }
  getShop(id) {
    return this.http
      .get(`${this.BASE_URL}/search/${id}`)
      .map(res => res.json());
  }
}