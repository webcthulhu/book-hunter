import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private authorized: boolean;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.user$.subscribe(user => { this.authorized = !!user; });
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authorized) { return true; }
    this.router.navigate(['/auth']);
    return false;
  }
}
