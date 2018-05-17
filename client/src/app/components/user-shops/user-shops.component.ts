import { Component, OnInit, Input } from '@angular/core';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-userShops',
  templateUrl: './user-shops.component.html',
  styleUrls: ['./user-shops.component.scss']
})
export class UserShopsComponent implements OnInit {

  @Input() shopItem: Object;

  constructor(public shopService:ShopService) { }

  ngOnInit() {
  }

}
