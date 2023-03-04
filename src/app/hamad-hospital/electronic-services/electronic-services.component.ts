import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ElectronicServicesService } from './electronic-services.service';

@Component({
    selector: 'app-electronic-services',
    templateUrl: './electronic-services.component.html',
    styleUrls: ['./electronic-services.component.scss'],
})
export class ElectronicServicesComponent implements OnInit {
    PublicServices$!:Observable<any>;
    Suggestion$!:Observable<any>;
    Rating$!:Observable<any>;
    Visitors$!:Observable<any>;
    PressCoverageRequest$!:Observable<any>;
    VisitRequest$!:Observable<any>;
    showMessageDialog$!:Observable<any>;
    constructor(private _electronicServicesService:ElectronicServicesService) {}

    ngOnInit(): void {

        this._electronicServicesService.getBeneficiaries();
        this._electronicServicesService.getSuggestion();
        this._electronicServicesService.getRating();
        this._electronicServicesService.getVisitors();
        this._electronicServicesService.getPressCoverageRequest();
        this._electronicServicesService.getVisitRequest();
        this.PublicServices$ = this._electronicServicesService.Selector$('PublicServices')
        this.Suggestion$ = this._electronicServicesService.Selector$('Suggestion')
        this.Rating$ = this._electronicServicesService.Selector$('Rating')
        this.Visitors$ = this._electronicServicesService.Selector$('Visitors')
        this.PressCoverageRequest$ = this._electronicServicesService.Selector$('PressCoverageRequest')
        this.VisitRequest$ = this._electronicServicesService.Selector$('VisitRequest');
        this.showMessageDialog$ = this._electronicServicesService.Selector$('showMessageDialog')
    }

    deleteItem(item:any){

    }
    editItem(item:any){

    }

    openDialog(item?: any){
        this._electronicServicesService.displayDialogs(
            'showMessageDialog',
            true,
            item
        );
    }


}
