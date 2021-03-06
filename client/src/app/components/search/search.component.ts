import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { SearchService } from "../../services/search.service";
import { ShopService } from "../../services/shop.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  queryFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ]);
  shopsData: any;
  services:string;
  type: string;

  cities: Array<Object> = [];
  cityIndex: any;
  shopList: Array<Object> = [];
  priceMin: Number = 0;
  priceMax: Number = 0;

  constructor(
    private shopService: ShopService,
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router
  ) {
    this.searchService.getCity().subscribe( list => {
      this.cities = list;
    })
    this.searchService.getShopTypes().subscribe( list => {
      this.shopList = list;
    })
  }

  ngOnInit() {}
  getListEvent(queryForm) {
    console.log(queryForm)
    const obj = queryForm.form.value
    let query = `${obj.type}?`
    for( let key in obj ){
      if(obj[key] != obj.type && obj[key] != undefined && obj[key] != true  && obj[key] != false)
      query+=`${key}=${obj[key]}&`
    }
    query+= "name="
    for(let key in obj){
      if(obj[key] == true)
      query += `${key},`
    }
    query = query.substr(0,query.length-1)

    this.searchService.getListEvent(query).subscribe( query => this.shopsData = query
    );
  }
  passIndex(i){
    console.log(i)
    this.cityIndex = i;
    console.log(this.cityIndex)
  }
}
