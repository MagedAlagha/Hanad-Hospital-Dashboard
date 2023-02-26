import { tap } from 'rxjs/operators';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AutoCompleteFeildService {
    readonly baseUrl: string = environment.baseUrl + 'common/';
    readonly baseUrlHr: string = 'https://hr-api.accessline.ps/api/' + 'common/';
    readonly baseUrlKG: string = environment.baseUrl;

    constructor(private http: HttpClient) {}
    search(
        TableName: string,
        key: string,
        Center?: any,
        UrlEndPoint?: string | null
    ) {
        Center = +Center > -1 ? '&Center=' + Center : '';
        UrlEndPoint =
            UrlEndPoint != null && UrlEndPoint.length > 0
                ? environment.baseUrl + UrlEndPoint
                : this.baseUrl;
        return this.http.get<any[]>(
            UrlEndPoint +
                `SearchByName?TableName=${TableName}&Key=${key}${Center}`
        );
    }
    searchInHr(
        TableName: string,
        key: string,
        Center?: any,
        UrlEndPoint?: string | null
    ) {
        Center = +Center > -1 ? '&Center=' + Center : '';
        UrlEndPoint = UrlEndPoint = this.baseUrlHr;
        return this.http.get<any[]>(
            UrlEndPoint + `search?resourceName=${TableName}&Key=${key}${Center}`
        );
    }
    searchInKG(
        TableName: string,
        key: string,
        Center?: any,
        UrlEndPoint?: string | null
    ) {
        Center = +Center > -1 ? '&Center=' + Center : '';
        UrlEndPoint =
            UrlEndPoint != null && UrlEndPoint.length > 0
                ? environment.baseUrl + UrlEndPoint
                : this.baseUrlKG;
        return this.http.get<any[]>(
            UrlEndPoint +
                `KGCodes/SearchByName?TableName=${TableName}&Key=${key}${Center}`
        );
    }
}
