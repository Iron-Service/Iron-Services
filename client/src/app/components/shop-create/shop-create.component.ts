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

@Component({
  selector: "app-shop-create",
  templateUrl: "./shop-create.component.html",
  styleUrls: ["./shop-create.component.scss"]
})
export class ShopCreateComponent implements OnInit {
  isLinear = false;
  isEditable: boolean = true;
  formGroup: FormGroup;
  shopList: Array<Object> = [];
  type: string;
  days: Array<String> = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  

  get formArray(): AbstractControl | null {
    return this.formGroup.get("formArray");
  }
  constructor(
    private _location: Location,
    private authService: AuthService,
    private fb: FormBuilder,
    private searchService: SearchService
  ) {
    this.searchService.getShopTypes().subscribe(list => {
      this.shopList = list;
    });
  }

  ngOnInit() {}
  backClicked() {
    this._location.back();
  }
}
