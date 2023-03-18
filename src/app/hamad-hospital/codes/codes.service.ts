import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CodesService {


    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService
    ) {}
    store = new BehaviorSubject<jobFunctionalModel>({
        codes: { data: [], loading: false },
        codesParent: { data: [], loading: false },
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
   /*  .subscribe((value) => {
        this.getPermissions();
    }) */
    saveCodes(data: any) {
        return this._http.saveData('Codes/CodesSave', data);
    }
    getCodesParent() {
        this.getFormApi(
            'Codes/CodesParentSelect/Parent',
            'codesParent',
            {},
            {
                isLoading: true,
            }
        );
    }
    getCodes(ID:any) {
        this.getFormApi(
            'Codes/CodesSelect',
            'codes',
            {
                ParentID:ID
            },
            {
                isLoading: true,
            }
        );
    }

    deleteCodes(ID: any) {
        return this._http
            .deleteData('Codes/CodesDelete', {
                ID: ID,
            })
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
    codes?: { data: any; loading: boolean };
    codesParent?: { data: any; loading: boolean };
}
export type selectorsType = keyof jobFunctionalModel;
