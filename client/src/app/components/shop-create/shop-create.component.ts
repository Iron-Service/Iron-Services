import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Location } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";
import { SearchService } from "../../services/search.service";
import { ShopService } from "../../services/shop.service";

interface Day {
  name: String;
  open: Boolean;
  evening: Boolean;
  amOp: {hour: String, minute: String } ;
  amCl: {hour: String, minute: String } ;
  pmOp: {hour: String, minute: String } ;
  pmCl: {hour: String, minute: String } ;
}

@Component({
  selector: "app-shop-create",
  templateUrl: "./shop-create.component.html",
  styleUrls: ["./shop-create.component.scss"]
})
export class ShopCreateComponent implements OnInit {

  shopFormControl = new FormControl ('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  shopData: any;
  isLinear = true;
  isEditable: boolean = true;
  formGroup: FormGroup;
  shopList: Array<Object> = [];
  serviceType: string;
  name: string;
  description: string;
  list: any;
 
  date: any = [
    {
      name: "Monday",
      open: false,
      evening: false,
      amOp: { hour: "08", minute: "00" },
      amCl: { hour: "13", minute: "00" },
      pmOp: { hour: "17", minute: "00" },
      pmCl: { hour: "21", minute: "00" }
    },
    {
      name: "Tuesday",
      open: false,
      evening: false,
      amOp: { hour: "08", minute: "00" },
      amCl: { hour: "13", minute: "00" },
      pmOp: { hour: "17", minute: "00" },
      pmCl: { hour: "21", minute: "00" }
    },
    {
      name: "Wednesday",
      open: false,
      evening: false,
      amOp: { hour: "08", minute: "00" },
      amCl: { hour: "13", minute: "00" },
      pmOp: { hour: "17", minute: "00" },
      pmCl: { hour: "21", minute: "00" }
    },
    {
      name: "Thursday",
      open: false,
      evening: false,
      amOp: { hour: "08", minute: "00" },
      amCl: { hour: "13", minute: "00" },
      pmOp: { hour: "17", minute: "00" },
      pmCl: { hour: "21", minute: "00" }
    },
    {
      name: "Friday",
      open: false,
      evening: false,
      amOp: { hour: "08", minute: "00" },
      amCl: { hour: "13", minute: "00" },
      pmOp: { hour: "17", minute: "00" },
      pmCl: { hour: "21", minute: "00" }
    },
    {
      name: "Saturday",
      open: false,
      evening: false,
      amOp: { hour: "08", minute: "00" },
      amCl: { hour: "13", minute: "00" },
      pmOp: { hour: "17", minute: "00" },
      pmCl: { hour: "21", minute: "00" }
    },
    {
      name: "Sunday",
      open: false,
      evening: false,
      amOp: { hour: "08", minute: "00" },
      amCl: { hour: "13", minute: "00" },
      pmOp: { hour: "17", minute: "00" },
      pmCl: { hour: "21", minute: "00" }
    }
  ];
  hours: Array<String> = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23"
  ];
  minutes: Array<String> = ["00", "15", "30", "45"];

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
  submit(shopForm) {
    const obj = shopForm.form.value;
    console.log(obj)
    const {name, description, serviceType} = shopForm.form.value;
    let serviceList = []
    for (let key in obj) {
      if (        
        obj[key] == true &&
        key.indexOf("date") === -1
      )
        serviceList.push({name:key, priceMin:10})
    }
    console.log(serviceList)
    const date = this.date
    const direction = this.Direction;
    const newShop = {name, direction, description, serviceType, serviceList, date};
    this.shopService.createShop(newShop).subscribe(query => {
      this.shopData = query;
    });
  }
  direction(event) {
    this.Direction = event;
  }
}
