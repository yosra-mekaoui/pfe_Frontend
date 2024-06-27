import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../../modules/auth-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  createAccountText = 'Create an account';
  forgotPasswordText = 'Forgot password?';
  connectButtonText = 'Connect';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    console.log(credentials)
        this.authService.login(credentials).subscribe(
      (response: AuthResponse) => {
        this.authService.storeTokens(response.accessToken, response.refreshToken);
        // localStorage.setItem('userName', response.user.firstName);
        // localStorage.setItem('userRole', response.user.role);
        console.log('Login successful');
        this.router.navigate(['/dashboard']);
      },
      (error: HttpErrorResponse) => {
        console.log(error); // Log the error to get more details
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 400) {
          this.errorMessage = 'Bad request. Please check your input.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    );
  }
}
