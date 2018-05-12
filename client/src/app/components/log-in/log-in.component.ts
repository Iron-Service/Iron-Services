import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent {
  username: string;
  password: string;
  error: string;

  constructor(public authService: AuthService, public router: Router) {}

  logIn() {
    console.log(this.username, this.password);
    this.authService
      .logIn(this.username, this.password)
      .subscribe(() => this.router.navigate(["/home"]));
  }

  logOut() {
    this.authService.logOut().subscribe(() => this.router.navigate(["/login"]));
  }
}
