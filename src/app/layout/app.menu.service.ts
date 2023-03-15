import { HttpService } from 'src/app/shared/services/http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { MenuChangeEvent } from './api/menuchangeevent';

@Injectable({
    providedIn: 'root',
})
export class MenuService {
    constructor(private http: HttpService) {}
    private menuSource = new Subject<MenuChangeEvent>();
    private resetSource = new Subject();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(event: MenuChangeEvent) {
        this.menuSource.next(event);
    }

    reset() {
        this.resetSource.next(true);
    }
    permissions = new BehaviorSubject<any>([]);
    permissions$ = this.permissions.asObservable();

    /* ********************** Permissions ************************** */
    /*  .subscribe((value) => {
        this.getPermissions();
    }) */

    getPermissionsForUser(ID: any) {
        this.http
            .getData('Users/Permissions', {
                ForUserID: ID,
            })
            .subscribe((value) => {
                this.permissions.next(value);
            });
    }
    /* ******************************************************* */
}
