import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';

import { MainPage } from './main-page/main-page';

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
    path: '**',
    component: Login,
  },
];
