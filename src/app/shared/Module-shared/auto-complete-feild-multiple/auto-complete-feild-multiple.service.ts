import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AutoCompleteFeildService {
    readonly baseUrl: string = environment.baseUrl + 'common/';

    constructor(private http: HttpClient) {}
    search(
        resourceName: string,
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
                `search?resourceName=${resourceName}&Key=${key}${Center}`
        );
    }
}
