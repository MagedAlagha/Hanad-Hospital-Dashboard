import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, tap } from 'rxjs';
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
        MediaSectionsItems:{ data: [], loading: false },
        MediaType:undefined,
        ImageSection: { data: [], loading: false },
        addPhotosDialog: { isOpen: false, data: '' },
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

    /*  *******  Start MediaType - API ******* */

    getMediaType() {
        this.getFormApi(
            'MediaSections/MediaTypesSelect/MediaType',
            'MediaType'
        );
    }

    /*  *******  Start MediaSectionsItems - API ******* */
    saveMediaSectionsItems(data: any) {
        return this._http
            .saveFormData('MediaSectionsItems/MediaSectionsItemsSave', data).pipe(tap(value=>{
                this.getMediaSectionsItems();

            }))

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
        this.getFormApi(
            'MediaSectionsItems/MediaSectionsItemsSearch',
            'MediaSectionsItems',
           {} ,
            {
                isLoading: true,
            }
        );
    }
 /*    MediaSectionID: 2 */

    /*  *******  Start ImageSection - API ******* */
    saveImageSection(data: any) {
        return this._http
            .saveFormData(
                'MediaSectionsItemsImages/MediaSectionsItemsImagesSave',
                data
            )
    }
  /*   MediaSectionsItemID: 1 */
    getImageSection(ID?:any) {
        this.getFormApi(
            'MediaSectionsItemsImages/MediaSectionsItemsImagesSearch',
            'ImageSection',
            { MediaSectionsItemID:ID },
            {
                isLoading: true,
            }
        );
    }
    deleteImageSection(ID: any) {
        return this._http
            .deleteData(
                'MediaSectionsItemsImages/MediaSectionsItemsImagesDelete',
                {
                    ID: ID,
                }
            )

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
    MediaType?: any;
    ImageSection?: { data: any; loading: boolean };
    addPhotosDialog?: { isOpen: false; data: any };
}
export type selectorsType = keyof jobFunctionalModel;
