import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class SearchService {
  BASE_URL = "http://localhost:3000";
  options: Object = { withCredentials: true };

  constructor(private http: Http) {}

  getList() {
    return this.http.get(`${this.BASE_URL}/api/`, this.options)
    .map(res => res.json());
  }
  getListEvent(myForm){
    return this.http.get(`${this.BASE_URL}/api/${myForm}`, this.options)
    .map(res => res.json());
  }

  getShop(id) {
    return this.http
      .get(`${this.BASE_URL}/api/search/${id}`, this.options)
      .map(res => res.json());
  }
  getCity() {
    return this.http
    .get(`${this.BASE_URL}/api/city/`)
    .map(res => res.json());
  }
  getShopTypes() {
    return this.http
    .get(`${this.BASE_URL}/api/shopList/`)
    .map(res => res.json());
  }
}