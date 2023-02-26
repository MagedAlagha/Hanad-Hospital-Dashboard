import { HttpService } from 'src/app/shared/services/http.service';
import { AuthService } from './auth.service';
import { HttpHRService } from 'src/app/shared/services/httpHR.service';
import { Observable, map, distinctUntilChanged, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    private store = new BehaviorSubject<{
        Notifications: { data: any; loading: boolean };
    }>({
        Notifications: { data: '', loading: false },
    });

    store$: Observable<any> = this.store.asObservable();

    get dataStore() {
        return this.store.getValue();
    }

    updateStore(newState: any) {
        this.store.next({
            ...this.dataStore,
            ...newState,
        });
    }

    constructor(private _httpService: HttpService) {}

    get Notifications$() {
        return this.store$.pipe(
            map((value) => value.Notifications),
            distinctUntilChanged()
        );
    }

    getNotifications() {
        this.updateStore({ Notifications: { data: [], loading: true } });
        return this._httpService
            .getData('Notifications', {
                // ID: this._authService.CurrentUserInfo[0]?.EmpID,
                System: 'KG',
            })
            .subscribe({
                next: (value: any[]) => {
                    this.updateStore({
                        NotReadNotifications: value?.filter(
                            (val: any) => !val.is_read
                        ).length,
                    });
                    this.updateStore({
                        Notifications: { data: value, loading: false },
                    });
                },
                error: (err) => {
                    this.updateStore({
                        NotReadNotifications: 0,
                    });
                    this.updateStore({
                        Notifications: { data: [], loading: false },
                    });
                },
            });
    }

    saveNotificationAsReade(ID: any) {
        return this._httpService
            .saveDataInParam('Notifications/Read', { IDs: `${ID}` })
            .subscribe((val: any) => {
                this.getNotifications();
            });
    }
}
