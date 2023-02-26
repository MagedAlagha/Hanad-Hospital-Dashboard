import { LoginByParentService } from './../../../MAEL_SYSTEM/Kindergarten/login-by-parent/login-by-parent.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthGuardiansService implements OnDestroy {
    private baseUrl: string = environment.baseUrl + 'Auth/Token';
    private ipAddress: string | undefined;
    constructor(
        private router: Router,
        private http: HttpClient,
        public _LoginByParentService: LoginByParentService
    ) {}

    login(infoLogin: any) {
        return this.http
            .post(this.baseUrl, {
                UserName: infoLogin.userName,
                Password: infoLogin.password,
            })
            .pipe(
                tap((res: any) => {
                    localStorage.setItem(
                        'currantGuardian',
                        JSON.stringify(res)
                    );
                    // this.getUserData();
                    this.router.navigate(['/auth/guardianLogin']);
                }),
                catchError((error: any) => {
                    return of();
                }),
                finalize(() => {})
            );
    }
    // getUserData() {
    //     this.http
    //         .get('https://hr-api.accessline.ps/api/Employees/mini')
    //         .subscribe((value) => {
    //             localStorage.setItem('CurrentUserInfo', JSON.stringify(value));
    //         });
    // }

    get GuardianInfo() {
        return JSON.parse(localStorage.getItem('currantGuardian')!);
    }
    logout() {
        this.router.navigate([
            '/auth/guardianLogin',
            this.GuardianInfo?.center,
        ]);
        localStorage.removeItem('currantGuardian');
    }
    get isActive() {
        var user = JSON.parse(localStorage.getItem('currantGuardian')!);
        return !!user?.token;
    }
    get user() {
        return JSON.parse(localStorage.getItem('currantGuardian')!);
    }

    ngOnDestroy() {
        // this.unsubscribe.forEach((sb) => sb.unsubscribe());
    }
    getIPAddress() {
        this.http
            .get('http://api.ipify.org/?format=json')
            .subscribe((res: any) => {
                this.ipAddress = res.ip;
            });
    }
    get IpAddress() {
        return this.ipAddress!;
    }
}
