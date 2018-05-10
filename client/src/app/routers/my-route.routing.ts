import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';
import { SearchComponent } from '../search/search.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ShopProfileComponent } from '../shop-profile/shop-profile.component';

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: SearchComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LogInComponent},
  { path: 'profile/:id', component: UserProfileComponent},
  { path: 'shop', component: ShopProfileComponent}
];

export const MyRouteRoutes = RouterModule.forChild(routes);
