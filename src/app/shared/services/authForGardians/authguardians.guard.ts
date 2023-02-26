import { HttpService } from '../http.service';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild,
    UrlTree,
} from '@angular/router';
import { AuthGuardiansService } from './authguardians.service';
import { Observable, of } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthGuardiansGuard implements CanActivateChild {
    constructor(
        private authGuardians: AuthGuardiansService,
        private http: HttpService,
        private router: Router
    ) {}
    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        if (!this.authGuardians.isActive) {
            this.router.navigate(['/auth/guardianLogin']);
            return of(false);
        } else {
            return of(true);
        }
    }
}
