import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { concat, forkJoin, Observable, merge } from 'rxjs';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
@Injectable({ providedIn: 'root' })
export class HttpService {
    private readonly baseUrl: string = environment.baseUrl;

    constructor(private http: HttpClient) {}

    getData(route: string, params: any = null) {
        return this.http.get<any>(this.baseUrl + route, {
            params: this.convartParams(params),
        });
    }
    getDatafromAlotOfApi(
        arrRoute: string[],
        params: any = null,
        Type?: string
    ): Observable<any> {
        let Arr$: Observable<any>[] = [];
        arrRoute.forEach((route) => {
            Arr$.push(
                this.http.get<any>(this.baseUrl + route, {
                    params: this.convartParams(params),
                })
            );
        });
        if (Type == 'concat') {
            return concat(Arr$);
        } else if (Type == 'merge') {
            return merge(Arr$);
        } else {
            return forkJoin(Arr$).pipe(
                map((data: any[]) => {
                    let newData: any[] = [];
                    data.forEach((value) => {
                        newData = [...newData, ...value];
                    });
                    return newData;
                })
            );
        }
    }
    saveDataInParam(route: string, body: any) {
        return this.http.post(
            this.baseUrl + route,
            {},
            {
                params: this.convartParams(body),
            }
        );
    }
    ExportToExcel(route: string, params: any = null) {
        return this.http
            .get<any>(this.baseUrl + route, {
                params: this.convartParams(params),
            })
            .pipe(
                tap((value) => {
                    var data: any;
                    if (value instanceof Object) {
                        data = value.Data;
                    }
                    if (value instanceof Array) {
                        data = value;
                    }
                    this.downloadExcel(data, 'Excel');
                })
            );
    }
    downloadExcel(data: any, Name: string) {
        const EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        //     const workSheet = XLSX.utils.json_to_sheet(data);
        //     const workBook = {
        //         Sheets: {
        //             testingSheet: workSheet,
        //         },
        //         SheetNames: ['testingSheet'],
        //     };
        //     const excelBuffer = XLSX.write(workBook, {
        //         bookType: 'xlsx',
        //         type: 'array',
        //     });
        //     const blobData = new Blob([excelBuffer], {
        //         type: EXCEL_TYPE,
        //     });
        //     saveAs(blobData, Name);
        // }
        // getCodes(PageName: string) {
        //     return this.getData('constant', { ScreenName: PageName });
    }
    saveData(route: string, body: any) {
        return this.http.post(this.baseUrl + route, this.convartData(body));
    }
    editData(route: string, body: any) {
        return this.http.put(this.baseUrl + route, this.convartData(body));
    }
    saveDataArray(route: string, body: any[]) {
        return this.http.post(this.baseUrl + route, body);
    }
    deleteData(route: string, params: any = null) {
        return this.http.delete(this.baseUrl + route, {
            params: this.convartParams(params),
        });
    }

    getBase46(route: string, params: any = null) {
        return this.http.get(this.baseUrl + route, {
            params: this.convartParams(params),
        });
    }

    getBlob(route: string, params: any = null) {
        return this.http
            .get(this.baseUrl + route, {
                params: this.convartParams(params),
                responseType: 'blob' as 'json',
            })
            .pipe(
                tap((f: any) => {
                    if (f && f != '') {
                        let blob = new Blob([f], {
                            type: this.getOutputType('p'),
                        }); // may change
                        let url = window.URL.createObjectURL(blob);
                        let pwa = window.open(url);
                        if (
                            !pwa ||
                            pwa.closed ||
                            typeof pwa.closed == 'undefined'
                        ) {
                        }
                    }
                })
            );
    }
    saveFormData(route: string, body: any) {
        const data = new FormData();
        Object.keys(body).forEach((key) => {
            if (body[key] instanceof Date)
                body[key] = moment(body[key]).format('YYYY-MM-DD');
            if (body[key] instanceof Array) {
                body[key].forEach((element: any) => {
                    data.append(key, element);
                });
            } else {
                data.append(key, body[key]);
            }
        });
        return this.http.post(this.baseUrl + route, data);
    }

    getFiles(route: string, params: any = null) {
        return this.http
            .get(this.baseUrl + route, {
                params: this.convartParams(params),
            })
            .pipe();
    }

    private convartData(body: any) {
        let newValue = { ...body };
        Object.keys(newValue).forEach((key) => {
            if (moment.isMoment(newValue[key]))
                newValue[key] = newValue[key].toDate();
            if (newValue[key] instanceof Date)
                newValue[key] = moment(newValue[key]).format('YYYY-MM-DD');
            if (newValue[key] == null) delete newValue[key];
        });
        return newValue;
    }

    private convartParams(params: any): any {
        if (params) {
            let newParams = this.convartData(params);
            let httpParams = new HttpParams();
            Object.keys(newParams).forEach(function (key) {
                httpParams = httpParams.set(key, newParams[key]);
            });
            return httpParams;
        } else {
            return null;
        }
    }

    private getOutputType(t: string) {
        switch (t) {
            case 'p':
                return 'application/pdf';
            case 'w':
                return 'application/msword';
            case 'e':
                return 'application/vnd.ms-excel';
            default:
                return 'application/pdf';
        }
    }
}
