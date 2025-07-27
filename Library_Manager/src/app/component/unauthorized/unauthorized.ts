import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  imports: [],
  templateUrl: './unauthorized.html',
  styleUrl: './unauthorized.scss',
})
export class Unauthorized {
  constructor(private router: Router) {}

  goBack() {
    window.history.back();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
