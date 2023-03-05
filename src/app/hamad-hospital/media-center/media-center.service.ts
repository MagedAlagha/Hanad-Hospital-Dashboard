import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { getFormApiGonfig } from 'src/app/shared/models';
import { GetFormApiService } from 'src/app/shared/services/functionsForHandelWithApi/getFormApi.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class MediaCenterService {
    constructor(
        private _http: HttpService,
        private _getFormApiService: GetFormApiService
    ) {}
    store = new BehaviorSubject<jobFunctionalModel>({
        Stats: { data: [], loading: false },
        MediaSectionsItems: { data: [], loading: false },
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


    /*  *******  Start MediaSectionsItems - API ******* */
    saveMediaSectionsItems(data: any) {
        return this._http
            .saveFormData('MediaSectionsItems/MediaSectionsItemsSave', data)
            .subscribe((value) => {
                this.getMediaSectionsItems();
            });
    }
    deleteMediaSectionsItems(ID: any) {
        return this._http
            .deleteData('MediaSectionsItems/MediaSectionsItemsDelete', {
                ID: ID,
            })
            .subscribe((value) => {
                this.getMediaSectionsItems();
            });
    }
    getMediaSectionsItems() {
        this.getFormApi('MediaSectionsItems/MediaSectionsItemsSearch', 'MediaSectionsItems',{MediaSectionID:2}, {
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
    Stats?: { data: any; loading: boolean };
    MediaSectionsItems?: { data: any; loading: boolean };
}
export type selectorsType = keyof jobFunctionalModel;
