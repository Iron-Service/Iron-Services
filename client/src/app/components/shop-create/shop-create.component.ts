import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Location } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { SearchService } from "../../services/search.service";
import { ShopService } from "../../services/shop.service";

@Component({
  selector: "app-shop-create",
  templateUrl: "./shop-create.component.html",
  styleUrls: ["./shop-create.component.scss"]
})
export class ShopCreateComponent implements OnInit {
  shopData: any;
  isLinear = false;
  isEditable: boolean = true;
  formGroup: FormGroup;
  shopList: Array<Object> = [];
  type: string;
  days: Array<Object> = [
    { name: "Monday", open: false, evening: false, amOp: String, amCl: String, pmOp: String, pmCl: String },
    { name: "Tuesday", open: false, evening: false, amOp: String, amCl: String, pmOp: String, pmCl: String },
    { name: "Wednesday", open: false, evening: false, amOp: String, amCl: String, pmOp: String, pmCl: String  },
    { name: "Thursday", open: false, evening: false, amOp: String, amCl: String, pmOp: String, pmCl: String  },
    { name: "Friday", open: false, evening: false, amOp: String, amCl: String, pmOp: String, pmCl: String },
    { name: "Saturday", open: false, evening: false, amOp: String, amCl: String, pmOp: String, pmCl: String  },
    { name: "Sunday", open: false, evening: false, amOp: String, amCl: String, pmOp: String, pmCl: String }
  ];
  hours: Array<String> = [
    "00","01","02","03","04","05","06","07",
    "08","09","10","11","12","13","14","15",
    "16","17","18","19","20","21","22","23"
  ];
  minutes: Array<String> = [
    "00", "15", "30", "45"
  ]

  Direction: Object;
  

  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }
  constructor(
    private _location: Location,
    private authService: AuthService,
    private fb: FormBuilder,
    private searchService: SearchService,
    private shopService: ShopService
  ) {
    this.searchService.getShopTypes().subscribe(list => {
      this.shopList = list;
    });
  }

  ngOnInit() {}
  backClicked() {
    this._location.back();
  }
  submit(shopForm){
    this.shopService.createShop(shopForm).subscribe(query => {
      console.log(query)
      this.shopData = query})
    }
    direction(event){
    console.log(event)
    this.Direction = event
  }
}
