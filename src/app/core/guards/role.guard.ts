import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface RoleData {
    roles: string[];
    }
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const data = route.data as RoleData;
    const requiredRoles = data.roles;
    const userRole = this.authService.getUserRole();

    if (!userRole || !requiredRoles.includes(userRole)) {
      alert('Unauthorized access');
      return this.router.parseUrl('/login'); // Redirect to login page for unauthorized access
    }
    
    return true;
  }
}
