import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  errorMessage: string;

  constructor() {
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.LoginForm.valid) {
    }
  }
}
