import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LogInComponent } from '../log-in/log-in.component';

export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  // { path: 'home', component: ThreadsComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LogInComponent},
];

export const MyRouteRoutes = RouterModule.forChild(routes);
