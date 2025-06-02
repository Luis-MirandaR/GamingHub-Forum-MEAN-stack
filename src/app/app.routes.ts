import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { authRedirectGuard } from './guards/auth-redirect.guard';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './settings/profile/profile.component';
import { ForwardedThreadsComponent } from './forwarded-threads/forwarded-threads.component';
import { GamesComponent } from './games/games.component';
import { MyThreadsComponent } from './mythreads/mythreads.component';
import { CategoriesComponent } from './categories/categories.component';
import { ThreadDetailComponent } from './thread-detail/thread-detail.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authRedirectGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'settings/profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'forwarded-threads', component: ForwardedThreadsComponent, canActivate: [authGuard] },
  { path: 'games', component: GamesComponent, canActivate: [authGuard] },
  { path: 'mythreads', component: MyThreadsComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'thread/:id', component: ThreadDetailComponent, canActivate: [authGuard] },
];