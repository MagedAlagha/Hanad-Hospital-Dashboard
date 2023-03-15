import { MenuService } from './../../layout/app.menu.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationsService } from './notifications.service';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements OnDestroy {
    private baseUrl: string = environment.baseUrl + 'Auth/Login';
    private ipAddress: string | undefined;
    constructor(
        private router: Router,
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    login(infoLogin: any) {
        console.log('infoLogin', infoLogin);
        return this.http
            .post(this.baseUrl, {
                UserName: infoLogin.Username,
                Password: infoLogin.Password,
            })
            .pipe(
                tap((res: any) => {
                    if (res?.rv > 0) {
                        localStorage.setItem(
                            'CurrentUser',
                            JSON.stringify(res?.user)
                        );
                        this.getUserData();
                        console.log('login', this.isActive);
                        this.router.navigate(['/']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: ' Message',
                            detail: 'معلومات تسجيل الدخول غير صحيحى',
                        });
                    }
                }),
                // catchError((error: any) => {
                //     return of();
                // }),
                finalize(() => {})
            );
    }
    getUserData() {
        this.http
            .get('http://hamad_api.accessline.ps/api/Stats/StatsSearch')
            .subscribe((value: any) => {
                localStorage.setItem('CurrentUserInfo', JSON.stringify(value));
                const DefaultProg = value[0]?.DefaultProg?.split(',')[1];
                console.log('DefaultProgDefaultProg', DefaultProg);
                // this.MenuService.menuSelected.next(DefaultProg);
            });
    }
    logout() {
        localStorage.removeItem('CurrentUser');
        this.router.navigate(['/auth/login']);
    }
    get isActive() {
        if (localStorage.getItem('CurrentUser')!='undefined') {
            console.log(localStorage.getItem('CurrentUser'));
            var user = JSON.parse(localStorage.getItem('CurrentUser')!);
            return !!user?.token;
        } else {
            return false;
        }
    }
    get user() {
        return JSON.parse(localStorage.getItem('CurrentUser')!);
    }

    get CurrentUserInfo() {
        return JSON.parse(localStorage.getItem('CurrentUserInfo')!);
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
