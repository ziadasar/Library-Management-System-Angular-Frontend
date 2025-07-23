import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  LoginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  errorMessage: string;
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.errorMessage = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      return;
    }
    const credentials = {
      userName: this.LoginForm.value.userName || '',
      password: this.LoginForm.value.password || '',
    };

    this.router.navigate(['/main']);
    // this.authService.login(credentials).subscribe({
    //   next: () => {
    //     // this.router.navigate(['/main']);
    //     console.log('logged in');
    //   },
    //   error: (error) => {
    //     console.error('Login failed:', error);
    //     this.errorMessage = 'Invalid credentials. Please try again.';
    //   },
    // });
  }
}
