import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router, private authService: AuthService, private _location: Location  ) { }

  ngOnInit() {
  }
  logOut(){
    this.authService.logOut().subscribe()
  }
  backClicked() {
    this._location.back();
  }
}
