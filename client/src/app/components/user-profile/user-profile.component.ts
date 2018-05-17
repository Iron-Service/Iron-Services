import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  shopsList:Array<Object>;

  constructor(private authService:AuthService, private shopService:ShopService ) { }

  ngOnInit() {
    this.shopService.getList().subscribe(shopsList => {this.shopsList = shopsList; console.log(shopsList)})
  }
  createShop(shop){
    this.shopService.createShop(shop).subscribe()
  }
}
