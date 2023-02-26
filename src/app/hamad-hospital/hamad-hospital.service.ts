import { HttpService } from 'src/app/shared/services/http.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from '../shared/models';
import { AuthService } from '../shared/services/auth.service';
import { GetFormApiService } from '../shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpHRService } from '../shared/services/httpHR.service';

@Injectable({
    providedIn: 'root',
})
export class HamadHospitalService {
    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService,
        private _authService: AuthService
    ) {}
    store = new BehaviorSubject<jobFunctionalModel>({
        codes: undefined,
        needsTable: { data: [], loading: false },
        filterForNeedsTable: undefined,
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
    saveData(data: any) {
        return this._http.updateFormData('HeaderSlider/HeaderSliderSave', data);
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
    codes?: any;
    needsTable?: { data: any; loading: boolean };
    filterForNeedsTable?: any;
}
export type selectorsType = keyof jobFunctionalModel;
