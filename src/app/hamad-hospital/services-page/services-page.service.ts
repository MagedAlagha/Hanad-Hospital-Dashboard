import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesPageService {

  constructor(private _http: HttpService,
    private _getFormApiService: GetFormApiService,
    private _authService: AuthService) { }

  store = new BehaviorSubject<jobFunctionalModel>({
   dataTable: { data: [], loading: false },
   MedicalRehabilitationServices: { data: [], loading: false },
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
saveMedicalRehabilitationFeatures(data: any) {
    return this._http.saveFormData('MedicalRehabilitationFeatures/MedicalRehabilitationFeaturesSave', data).subscribe((value) => {
        this.getMedicalRehabilitationFeatures();
    });
}
deleteMedicalRehabilitationFeatures(ID: any) {
    return this._http.deleteData('MedicalRehabilitationFeatures/MedicalRehabilitationFeaturesDelete', {
        ID: ID,
    }).subscribe((value) => {
        this.getMedicalRehabilitationFeatures();
    });
}
getMedicalRehabilitationFeatures() {
    this.getFormApi('MedicalRehabilitationFeatures/MedicalRehabilitationFeaturesSearch', 'dataTable' , { isLoading: true });
}


/*  ******* Save MedicalRehabilitationServices ******* */
saveMedicalRehabilitationServices(data: any) {
    return this._http.saveFormData('MedicalRehabilitationServices/MedicalRehabilitationServicesSave', data).subscribe((value) => {
        this.getMedicalRehabilitationServices();
    });
}
deleteMedicalRehabilitationServices(ID: any) {
    return this._http.deleteData('MedicalRehabilitationServices/MedicalRehabilitationServicesDelete', {
        ID: ID,
    }).subscribe((value) => {
        this.getMedicalRehabilitationServices();
    });
}
getMedicalRehabilitationServices() {
    this.getFormApi('MedicalRehabilitationServices/MedicalRehabilitationServicesSearch', 'MedicalRehabilitationServices' , { isLoading: true });
}

/*  ******* Save Data Services ******* */
/*  */

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
MedicalRehabilitationServices?: { data: any; loading: boolean };

}
export type selectorsType = keyof jobFunctionalModel;
