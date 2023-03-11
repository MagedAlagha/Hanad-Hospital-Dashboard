import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(  private _http: HttpService,
    private _getFormApiService: GetFormApiService,
    private _authService: AuthService) { }

store = new BehaviorSubject<jobFunctionalModel>({
    codes: undefined,
    needsTable: { data: [], loading: false },
    sliderData: { data: [], loading: false },
    Stats: undefined,
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

/*  ******* Save Data Slider ******* */
saveData(data: any) {
    return this._http.saveFormData('HeaderSlider/HeaderSliderSave', data).subscribe((value) => {
        this.getSliderData();
    });
}
deleteSlider(ID: any) {
    return this._http.deleteData('HeaderSlider/HeaderSliderDelete', {
        ID: ID,
    }).subscribe((value) => {
        this.getSliderData();
    });
}
getSliderData() {
    this.getFormApi('HeaderSlider/HeaderSliderSearch', 'sliderData' ,{}, { isLoading: true });
}
getStats() {
    this.getFormApi('Stats/StatsSearch', 'Stats');
}

/*  ******* Save Data Services ******* */
/*  */
updateServices(data: any){
    return this._http.updateFormData('Services/ServicesUpdate', data).subscribe();
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
Stats?: any;
sliderData:{ data: any; loading: boolean };
}
export type selectorsType = keyof jobFunctionalModel;
