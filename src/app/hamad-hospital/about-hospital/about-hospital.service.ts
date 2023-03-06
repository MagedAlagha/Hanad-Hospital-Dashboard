import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class AboutHospitalService {
    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService
    ) {}
    store = new BehaviorSubject<jobFunctionalModel>({
        AboutHospital: { data: [], loading: false },
        showMessageDialog: { isOpen: false, data: '' },
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

    displayDialogs = (
        DialogName: selectorsType,
        isOpen: boolean,
        data?: any
    ) => {
        let dialog = {
            [DialogName]: {
                isOpen: isOpen,
                data: data,
            },
        };
        this.updateStore(dialog);
    };

    /*  ******* Save AboutHospital ******* */
    saveAboutHospital(data: any) {
        return this._http
            .saveData('AboutHospitalPoints/AboutHospitalPointsSave', data)
            .subscribe((value) => {
                this.getAboutHospital();
            });
    }
    deleteAboutHospital(ID: any) {
        return this._http
            .deleteData('AboutHospitalPoints/AboutHospitalPointsDelete', {
                ID: ID,
            })
            .subscribe((value) => {
                this.getAboutHospital();
            });
    }
    getAboutHospital() {
        this.getFormApi('AboutHospitalPoints/AboutHospitalPointsSearch', 'AboutHospital',{}
        , {
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
    AboutHospital?: { data: any; loading: boolean };
    showMessageDialog?: { isOpen: false; data: any };
}
export type selectorsType = keyof jobFunctionalModel;
