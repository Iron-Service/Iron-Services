import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

    signUpInfo = {
        username: "",
        email: "",
        password: ""
      };

  constructor(private authService:AuthService, public router: Router) { }

  ngOnInit() {
  }

    signUp(){
        this.authService.signUp(this.signUpInfo)
        .subscribe(() => this.router.navigate(["/home"]));
      }
    
      logOut(){
        this.authService.logOut()
        .subscribe(() => this.router.navigate(["/signup"]));
      }

}
