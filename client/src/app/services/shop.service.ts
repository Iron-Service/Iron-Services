import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from '../../environments/environment';

@Injectable()
export class ShopService {
  BASE_URL = "http://localhost:3000";
  options: Object = { withCredentials: true };

  constructor(private http: Http) {}

  getList() {
    return this.http.get(`${environment.BASE_URL}/api/shop`, this.options)
    .map(res => res.json());
  }

  createShop(shop) {
    return this.http
      .post(`${environment.BASE_URL}/api/shop/create`, shop , this.options)
      .map(res => res.json());
  }

  getShop(id) {
    return this.http
      .get(`${environment.BASE_URL}/api/shop/${id}`)
      .map(res => res.json());
  }

  updateShop(content, id) {
    console.log("Updated shop properties: " + content);
    return this.http
      .post(
        `${environment.BASE_URL}/api/shop/${id}/update`,
        { content },
        this.options
      )
      .map(res => res.json());
  }
  votedComment(id,num) {
    return this.http.get(`${environment.BASE_URL}/api/comment/${id}/${num}`, this.options)
    .map(res => res.json());
  }
  deleteShop(id) {
    console.log("Shop was removed from database.")
    //jaleatorio de destruir tiendas
    return this.http.get(`${environment.BASE_URL}/api/delete/${id}`, this.options)
    .map(res => res.json());
  }
}