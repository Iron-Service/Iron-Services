import { Component, OnInit } from "@angular/core";
import { ShopService } from "../../services/shop.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { SearchService } from "../../services/search.service";




@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  shopList: Array<Object> = [{name: "Hairdresser", services:["Wet Cut", "Dry Cut", "Hair Up", "Hair Up and Trial", "Bridal Hair and Trial", "Cut and Finish", "Clipper Cut", "Full Head Highlights", "Full Head Bleach", "Tonal Glossing", "Balayage", "Roots Tint", "T-Section Highlights", "Gents' Highlights"] }];
  constructor(
    private shopService: ShopService,
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

}
