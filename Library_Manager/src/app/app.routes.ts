import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';

import { MainPage } from './main-page/main-page';
import { AdminMainPage } from './admin-main-page/admin-main-page';

export const routes: Routes = [
  {
    path: 'main',
    component: MainPage,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin',
    component: AdminMainPage,
    // canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: '**',
    component: Login,
  },
];
