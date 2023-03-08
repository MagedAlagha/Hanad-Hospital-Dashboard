import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService
    ) {}
    store = new BehaviorSubject<jobFunctionalModel>({
        Permissions: { data: [], loading: false },
    });
    store$ = this.store.asObservable();
    updateStore(newSate: jobFunctionalModel) {
        this.store.next({
            ...this.store.value,
            ...newSate,
        });
    }
    get dataStore() {
        return this.store.getValue();
    }

    Selector$(selector: selectorsType) {
        return this.store$.pipe(
            map((value: any) => value[selector]),
            distinctUntilChanged()
        );
    }

    /* ********************** Permissions ************************** */
    savePermissions(data: any) {
        return this._http.saveData('Permissions', data).subscribe((value) => {
            this.getPermissions();
        });
    }
    getPermissions() {
        this.getFormApi(
            'Permissions',
            'Permissions',
            {},
            {
                isLoading: true,
            }
        );
    }
    /* ******************************************************* */

    getFormApi(
        api: string,
        selector: selectorsType,
        params?: any,
        config?: getFormApiGonfig
    ) {
        this._getFormApiService.getFormApi(
            this.store,
            api,
            selector,
            params,
            config
        );
    }
}
export interface jobFunctionalModel {
    Permissions?: { data: any; loading: boolean };
}
export type selectorsType = keyof jobFunctionalModel;
