import { Component, OnInit, Input } from "@angular/core";
import { SearchService } from "../../services/search.service";
import { ShopService } from "../../services/shop.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { SearchComponent } from "../search/search.component"

export interface Shop {
  name: string;
  direction: string;
  serviceType: [string];
  serviceList: [string];
  positive: number;
  negative: number;
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  @Input() shopItem: any;

  constructor(
    private shopService: ShopService,
    private searchService: SearchService,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    
  }



}
