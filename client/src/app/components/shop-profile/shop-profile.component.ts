import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ShopService } from "../../services/shop.service";
import { Router, ActivatedRoute } from "@angular/router";
import { SearchService } from "../../services/search.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-shop-profile",
  templateUrl: "./shop-profile.component.html",
  styleUrls: ["./shop-profile.component.scss"]
})
export class ShopProfileComponent implements OnInit {
  shop: object;

  constructor(
    private authService: AuthService,
    private _location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {
    this.route.params.subscribe(params => {
      this.searchService.getShop(params.id).subscribe(e => (this.shop = e));
    });
  }
  backClicked() {
    this._location.back();
  }
  ngOnInit() {}
}
