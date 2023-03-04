import { Injectable } from '@angular/core';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AboutHospitalService {

  constructor(  private _http: HttpService,
    private _getFormApiService: GetFormApiService) { }

   /*  ******* Save Advertisements ******* */
   saveAdvertisements(data: any) {
    return this._http
        .saveData('Advertisements/AdvertisementsSave', data)
        .subscribe();
}
}
