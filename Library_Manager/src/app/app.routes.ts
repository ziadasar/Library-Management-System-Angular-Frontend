import { Routes } from '@angular/router';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { MainPage } from './main-page/main-page';
import { AdminMainPage } from './admin-main-page/admin-main-page';
import { AuthGuard } from './core/services/auth-gaurd';
import { RoleGuard } from './core/services/role-gaurd';
import { Unauthorized } from './component/unauthorized/unauthorized';
import { LibrarianMainPage } from './librarian-main-page/librarian-main-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainPage,
    canActivate: [AuthGuard],
    data: {
      roles: ['user', 'librarian', 'admin'], // All authenticated roles
    },
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
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: ['admin'], // Admin only
    },
  },
  {
    path: 'librarian',
    component: LibrarianMainPage,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['librarian', 'admin'] }, // Both librarians and admins can access
  },
  {
    path: 'unauthorized',
    component: Unauthorized,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
