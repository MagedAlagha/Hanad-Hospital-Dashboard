import { tap } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UploadFilesService {
    constructor(private _httpService: HttpService) {}
    saveFile(body: any) {
        return this._httpService
            .saveFormData('Files', body)
            .pipe(tap((value) => {}));
    }

    deleteFile(ID: any) {
        return this._httpService.deleteData('Files', {
            ID: ID,
        });
    }
}
