import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

//  Services Imports
import { AuthService } from './services/auth.service';
import { ShopService } from './services/shop.service';
import { SearchService } from './services/search.service';
//  Router imports
import { routes } from './routers/my-route.routing';
//  Pipe imports
import { UrlPipe } from './pipes/url.pipe'
//  Component imports
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { ShopCreateComponent } from './components/shop-create/shop-create.component';
import { ShopProfileComponent } from './components/shop-profile/shop-profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { UserDirectionsComponent } from './components/user-directions/user-directions.component';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserShopsComponent } from './components/user-shops/user-shops.component';
import { UserFavoritesComponent } from './components/user-favorites/user-favorites.component';
//  Material imports
import { AppMaterialModule } from './app.module.material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Google Maps
import { MapsComponent } from './components/google-maps/google-maps.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MapsComponent,
    NavbarComponent,
    SearchComponent,
    SearchResultsComponent,
    ShopProfileComponent,
    ShopCreateComponent,
    SignUpComponent,
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
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDOuYtitp5sloRqK-gEtMnF0Myng6DM4o0"
    })
  ],
  providers: [AuthService, SearchService, ShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
