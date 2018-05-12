import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { routes } from './routers/my-route.routing';
import { SearchComponent } from './components/search/search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ShopProfileComponent } from './components/shop-profile/shop-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UrlPipe } from './pipes/url.pipe'
import { UserDirectionsComponent } from './components/user-directions/user-directions.component';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { UserShopsComponent } from './components/user-shops/user-shops.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
import { ShopService } from './services/shop.service';
import { SearchService } from './services/search.service';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { AppMaterialModule } from './app.module.material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    SearchComponent,
    NavbarComponent,
    ShopProfileComponent,
    UserProfileComponent,
    UserDirectionsComponent,
    UserMessagesComponent,
    UserShopsComponent,
    UserFavoritesComponent,
    UrlPipe
],
  imports: [
    BrowserModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, SearchService, ShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
