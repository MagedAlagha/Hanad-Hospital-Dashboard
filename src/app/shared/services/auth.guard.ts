import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild,
    UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
    constructor(
        private auth: AuthService,
        private http: HttpService,
        private router: Router
    ) {}
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!this.auth.isActive) {
            this.router.navigate(['/auth/login']);
            return of(false);
        } else {
            return of(true);
        }
    }
}
