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
    console.log('Login form submitted:');
    if (this.LoginForm.invalid) {
      this.LoginForm.markAllAsTouched();
      return;
    }

    const credentials = {
      username: this.LoginForm.value.userName || '',
      password: this.LoginForm.value.password || '',
    };

    // Uncomment and use this actual login implementation
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        // Assuming response contains a 'role' property
        const role = response.role?.toLowerCase(); // normalize case

        switch (role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'librarian':
            this.router.navigate(['/librarian']);
            break;
          default:
            this.router.navigate(['/main']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid credentials. Please try again.';
      },
    });

    // Remove this temporary navigation
    // this.router.navigate(['/main']);
  }
}
