import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { SearchService } from "../../services/search.service";
import { FormControl } from "@angular/forms";
import { ShopService } from "../../services/shop.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  shopsData: Array<Object> = [];
  services:string;
  type: string;

  cities: Array<Object> = [
    {
      name: "Madrid",
      districts: [
        { name: "Centro" },
        { name: "Arganzuela" },
        { name: "Barajas" },
        { name: "Carabanchel" },
        { name: "Chamartín" },
        { name: "Chamberí" },
        { name: "Ciudad Lineal" },
        { name: "Fuencarral-El Pardo" },
        { name: "Hortaleza" },
        { name: "Latina" },
        { name: "Moncloa-Aravaca" },
        { name: "Moratalaz" },
        { name: "Puente de Vallecas" },
        { name: "Retiro" },
        { name: "Salamanca" },
        { name: "San Blas" },
        { name: "Tetuán" },
        { name: "Usera" },
        { name: "Vicálvaro" },
        { name: "Villa de Vallecas" },
        { name: "Villaverde" }
      ]
    }
  ];

  shopList: Array<Object> = [
    {
      serviceType: "Hairdresser",
      serviceList: [
        { name: "Wet Cut" },
        { name: "Dry Cut" },
        { name: "Hair Up" },
        { name: "Hair Up and Trial" },
        { name: "Bridal Hair and Trial" },
        { name: "Cut and Finish" },
        { name: "Clipper Cut" },
        { name: "Full Head Highlights" },
        { name: "Full Head Bleach" },
        { name: "Tonal Glossing" },
        { name: "Balayage" },
        { name: "Roots Tint" },
        { name: "T-Section Highlights" },
        { name: "Gents' Highlights" }
      ]
    },
    {
      serviceType: "Mechanic",
      serviceList: [
        { name: "Brake & Clutch" },
        { name: "Car Electrical" },
        { name: "Suspension & Steering" },
        { name: "Cooling System & Overheating" },
        { name: "Engine Work & Tuning" },
        { name: "Fuel Injection" }
      ]
    },
    {
      serviceType: "Tailor",
      serviceList: [
        { name: "Skirts" },
        { name: "Dresses" },
        { name: "Trousers" },
        { name: "Jackets" },
        { name: "Coats" },
        { name: "Shirts / Blouses" },
        { name: "Miscellaneous" }
      ]
    },
    {
      serviceType: "Photographer",
      serviceList: [
        { name: "Portrait Photography" },
        { name: "Corporate Portrait" },
        { name: "Event Photography" },
        { name: "Artists and public figures" },
        { name: "Architectural photography" },
        { name: "Beauty and fashion photography" },
        { name: "The body and artistic nudes" }
      ]
    },
    {
      serviceType: "Driving Courses",
      serviceList: [
        { name: "Car License" },
        { name: "Motorcycle License" },
        { name: "Commercial License" },
        { name: "Heavy Trailer Endorsement" },
        { name: "Heavy RVs License" },
        { name: "Riding mopeds and scooters" }
      ]
    }
  ];
  
  constructor(
    private shopService: ShopService,
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router
  ) {}
  getListEvent() {
    this.searchService.getListEvent(this.type).subscribe(list => {
      this.shopsData = list;
    });
    console.log(this.services)
  }
  ngOnInit() {}
  
}
