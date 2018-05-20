import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

constructor(private http: Http) { }

}
