import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
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
  email: string='';
  password: string='';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response: AuthResponse) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/']);
      },
      error => {
        console.error(error);
      }
    );
  }
}
