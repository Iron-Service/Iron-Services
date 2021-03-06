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
import { Route, Router } from "@angular/router";

interface Date {
  name: String;
  open: Boolean;
  evening: Boolean;
  amOp: { hour: String; minute: String };
  amCl: { hour: String; minute: String };
  pmOp: { hour: String; minute: String };
  pmCl: { hour: String; minute: String };
}

interface ServiceList {
  name?: String;
  priceMin: Number;
  priceMax: Number;
}
interface ServiceType {
  name: String;
}
interface ShopList {
  created_at: String;
  serviceList: Array<Object>;
  serviceType: String;
  updated_at: String;
  __v?: Number;
  _id?: String;
}

@Component({
  selector: "app-shop-create",
  templateUrl: "./shop-create.component.html",
  styleUrls: ["./shop-create.component.scss"]
})
export class ShopCreateComponent implements OnInit {
  shopFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3)
  ]);
  //Stepper attributes
  isLinear = true;
  isEditable: boolean = true;

  formGroup: FormGroup;
  shopData: any;
  name: String;
  description: String;
  serviceType: ServiceType;
  serviceList: Array<ServiceList> = [];
  price: Array<Number> = [];
  priceMax: Array<Number> = [];
  priceRange: Array<Boolean> = [false];
  // Services data we get from backend
  shopList: Array<ShopList>;
  list: any;

  date: Array<Date> = [
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
    private searchService: SearchService,
    private shopService: ShopService,
    private router: Router
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
    const { name, description, serviceType } = shopForm.form.value;
    let newserviceList = [];

    for (let i = 0; i < this.serviceList.length; i++) {
      if (this.serviceList[i].priceMin != 0)
        newserviceList.push(this.serviceList[i]);
    }
    let cont = 0;
    let serviceList = [];
    for (let key in obj) {
      if (obj[key] == true && key.indexOf("date") === -1  && key.indexOf("priceRange")=== -1) {
        console.log(key)
        newserviceList[cont].name = key;
        serviceList.push(newserviceList[cont]);
        cont++;
      }
    }
    const date = this.date;
    const direction = this.Direction;
    const newShop = {
      name,
      direction,
      description,
      serviceType,
      serviceList,
      date
    };
    this.shopService.createShop(newShop).subscribe(query => {
      this.shopData = query;
      this.router.navigate(["/profile"]);
    });
  }
  direction(event) {
    this.Direction = event;
  }
  supplyValues(event) {
    this.serviceList = [];
    for (let i = 0; i < this.shopList.length; i++) {
      if (this.shopList[i].serviceType == event[0]) {
        for (let j = 0; j < this.shopList[i].serviceList.length; j++) {
          this.serviceList.push({priceMin: 0, priceMax: 0, name:""});
        }
        break;
      }
    }
    console.log(this.serviceList);
  }
}
