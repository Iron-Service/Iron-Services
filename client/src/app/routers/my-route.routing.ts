import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LogInComponent } from '../components/log-in/log-in.component';
import { SearchComponent } from '../components/search/search.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { ShopProfileComponent } from '../components/shop-profile/shop-profile.component';
import { UserDirectionsComponent } from '../components/user-directions/user-directions.component';
import { UserMessagesComponent } from '../components/user-messages/user-messages.component';
import { UserShopsComponent } from '../components/user-shops/user-shops.component';
import { UserFavoritesComponent } from '../components/user-favorites/user-favorites.component';
import { ShopCreateComponent } from '../components/shop-create/shop-create.component';

export const routes: Routes = [
  { path: '', redirectTo:'search', pathMatch:'full'},
  { path: 'search', component: SearchComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LogInComponent},
  { path: 'logout', component: LogInComponent},
  { path: 'search/:id', component: SearchComponent},
  { path: 'shop/:id', component: ShopProfileComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'profile/directions', component: UserDirectionsComponent },
  { path: 'profile/messages', component: UserMessagesComponent},
  { path: 'profile/shops', component: UserShopsComponent },
  { path: 'profile/shops/create', component: ShopCreateComponent},
  { path: 'profile/favorites', component: UserFavoritesComponent },
];

export const MyRouteRoutes = RouterModule.forChild(routes);
