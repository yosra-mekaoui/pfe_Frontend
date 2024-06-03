import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../modules/auth-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  createAccountText = 'Create an account';
  forgotPasswordText = 'Forgot password?';
  connectButtonText = 'Connect';
  email: string='';
  password: string='';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}
