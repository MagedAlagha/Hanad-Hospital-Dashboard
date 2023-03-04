import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap, filter, mergeMap, catchError, map } from 'rxjs/operators';
import {
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpErrorResponse,
    HttpRequest,
    HttpResponse,
    HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthGuardiansService } from '../shared/services/authForGardians/authguardians.service';

@Injectable({
    providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private _authGuardiansService: AuthGuardiansService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private _translateService: TranslateService,
        private router: Router
    ) {}
    intercept(
        req: HttpRequest<HttpEvent<any>>,
        next: HttpHandler
    ): Observable<any> {
        console.log('dddd')
        if (this.router.url.includes('KGguardians')) {
            if (this._authGuardiansService.isActive) {
                req = req.clone({
                    headers: new HttpHeaders({
                        Authorization:
                            'Bearer ' + this._authGuardiansService?.user?.token,
                        // IpAddress: this.auth.IpAddress,
                        // LanguageId: localStorage.getItem('language')!,
                        // deviceType: this.deviceService.deviceType,
                    }),
                });
            }
        } else {
            if (this.auth.isActive) {
                req = req.clone({
                    headers: new HttpHeaders({
                        Authorization: 'Bearer ' + this.auth?.user?.token,
                        // IpAddress: this.auth.IpAddress,
                        // LanguageId: localStorage.getItem('language')!,
                        // deviceType: this.deviceService.deviceType,
                    }),
                });
            }
        }

        const reqAfterClone = next.handle(req).pipe(
            mergeMap((value: any) => {
                if (value instanceof HttpResponse) {
                    if (typeof value!.body! === 'string') {
                        const response = this.HandleStringResponse(value!.body);
                        if (response!.status! > 0 && response!.message) {
                            this.messageService.add({
                                severity: 'success',
                                summary: ' Message',
                                detail: response!.message,
                            });
                        } else if (response!.status! < 1 && response!.message) {
                            this.messageService.add({
                                severity: 'error',
                                summary: ' Message',
                                detail: response!.message,
                            });
                        }
                    } else if (value!.body!.status && value!.body!.message) {
                        if (value!.body!.status > 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary: ' Message',
                                detail: value!.body!.message,
                            });
                        } else if (value!.body!.status < 1) {
                            this.messageService.add({
                                severity: 'error',
                                summary: ' Message',
                                detail: value!.body!.message,
                            });
                        }
                    } else {
                        if (
                            value!.body!.rv > 0 &&
                            (value!.body!.Msg || value!.body!.msg)
                        ) {
                            this.messageService.add({
                                severity: 'success',
                                summary: ' Message',
                                detail: value!.body!.Msg || value!.body!.msg,
                            });
                        } else if (
                            value!.body!.rv < 1 &&
                            (value!.body!.Msg || value!.body!.msg)
                        ) {
                            this.messageService.add({
                                severity: 'error',
                                summary: ' Message',
                                detail: value!.body!.Msg || value!.body!.msg,
                            });
                            if (value!.body!.Msg || value!.body!.msg) {
                                return throwError(() => value!.body!);
                            }
                        }
                    }
                }
                return of(value);
            }),

            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status == 500) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Server Error',
                            detail: '',
                        });
                    } else if (err.status == 400) {
                        var eror = '';
                        if (err?.error?.rv <= 0 && err?.error?.msg) {
                            this.messageService.add({
                                severity: 'error',
                                detail: err?.error?.msg,
                            });
                        } else {
                            Object.keys(err.error.errors).forEach((key) => {
                                err.error.errors[key].forEach(
                                    (element: any) => {
                                        eror = element;
                                        if (eror) {
                                            this.messageService.add({
                                                severity: 'error',
                                                detail: eror,
                                            });
                                        }
                                    }
                                );
                            });
                        }
                    } else if (err.status == 401) {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'un Unauthorized',
                            detail: '',
                        });
                        // this.auth.logout();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Server Error',
                            detail: '',
                        });
                    }
                }
                return throwError(() => err);
            })
        );

        if (req.method == 'DELETE') {
            return this.confirm().pipe(
                mergeMap((value) => {
                    return value ? reqAfterClone : of();
                })
            );
        } else if (
            req.url ==
            'https://meal.accessline.ps/api/v1.0/Common/ProcOrderTransfer'
        ) {
            return this.confirm().pipe(
                mergeMap((value) => {
                    return value ? reqAfterClone : of();
                })
            );
        } else if (
            req.url ==
            'https://meal.accessline.ps/api/v1.0/KGGuardiansUsers/RegistrationAppsRenew'
        ) {
            return this.confirm().pipe(
                mergeMap((value) => {
                    return value ? reqAfterClone : of();
                })
            );
        } else {
            return reqAfterClone;
        }
    }

    message: any = this._translateService.instant('Shared.ARE_YOU_SURE');
    confirm({
        message = this.message,
        header = 'Confirmation',
        icon = 'pi pi-exclamation-triangle',
    } = {}): Observable<boolean> {
        return new Observable((subscriber) => {
            this.confirmationService.confirm({
                message,
                header,
                icon,
                accept: () => {
                    subscriber.next(true);
                },
                reject: () => {
                    subscriber.next(false);
                },
            });
        });
    }

    HandleStringResponse(
        stringResponse: string
    ): { status: number; message: string } | undefined {
        if (stringResponse.includes('|')) {
            const arrResponse: string[] = stringResponse!.split('|');
            if (arrResponse.length === 2) {
                return { status: +arrResponse[0], message: arrResponse[1] };
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }
}
