import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { routes } from './routers/my-route.routing';
import { SearchComponent } from './search/search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShopProfileComponent } from './shop-profile/shop-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UrlPipe } from './pipes/url.pipe'

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    SearchComponent,
    UserProfileComponent,
    ShopProfileComponent,
    NavbarComponent,
    UrlPipe
],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
