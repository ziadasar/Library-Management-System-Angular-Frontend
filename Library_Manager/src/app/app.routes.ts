import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: '**',
    component: Login,
  },
  {
    path: 'login',
    component: Login,
  },
];
