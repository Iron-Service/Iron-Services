import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ShopService {
  BASE_URL = "http://localhost:3000";
  options: Object = { withCredentials: true };

  constructor(private http: Http) {}

  getList() {
    return this.http.get(`${this.BASE_URL}/shop`, this.options)
    .map(res => res.json());
  }

  createShop(shop) {
    return this.http
      .post(`${this.BASE_URL}/shop/create`, shop , this.options)
      .map(res => res.json());
  }

  getShop(id) {
    return this.http
      .get(`${this.BASE_URL}/shop/${id}`)
      .map(res => res.json());
  }

  updateShop(content, id) {
    console.log("Updated shop properties: " + content);
    return this.http
      .post(
        `${this.BASE_URL}/shop/${id}/update`,
        { content },
        this.options
      )
      .map(res => res.json());
  }
  deleteShop() {
    console.log("Shop was removed from database.")
    //jaleatorio de destruir tiendas
  }
}