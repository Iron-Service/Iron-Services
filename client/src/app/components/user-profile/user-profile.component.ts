import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private authService:AuthService, private shopService:ShopService ) { }

  ngOnInit() {
  }
  createShop(shop){
    this.shopService.createShop(shop).subscribe()
  }
}
