import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authSvc.isAuth().pipe(
      tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/login']).then();
        }
      })
    );
  }
}
