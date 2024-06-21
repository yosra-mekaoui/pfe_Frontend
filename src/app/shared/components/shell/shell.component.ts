import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  constructor(private authService: AuthService)
  {}
  
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

}
