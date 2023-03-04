import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class AdvertisementsService {
    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService
    ) {}

    store = new BehaviorSubject<jobFunctionalModel>({
        dataTable: { data: [], loading: false },
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

    /*  ******* Save Advertisements ******* */
    saveAdvertisements(data: any) {
        return this._http
            .saveData('Advertisements/AdvertisementsSave', data)
            .subscribe((value) => {
                this.getAdvertisements();
            });
    }
    deleteAdvertisements(ID: any) {
        return this._http
            .deleteData('Advertisements/AdvertisementsDelete', {
                ID: ID,
            })
            .subscribe((value) => {
                this.getAdvertisements();
            });
    }
    getAdvertisements() {
        this.getFormApi('Advertisements/AdvertisementsSearch', 'dataTable', {
            isLoading: true,
        });
    }

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
    dataTable?: { data: any; loading: boolean };
}
export type selectorsType = keyof jobFunctionalModel;
