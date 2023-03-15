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
}
