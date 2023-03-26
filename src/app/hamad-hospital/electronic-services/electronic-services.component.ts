import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ElectronicServicesService } from './electronic-services.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    Form_search!:FormGroup<any>;
    constructor(private _electronicServicesService:ElectronicServicesService , private fb:FormBuilder) {
        this.Form_search = fb.group({
            FullName: [''],
            Address: [''],
            IdentityNumber: [''],
            FromAppointment: [''],
            ToAppointment: [''],
            DepartmentID: [''],
          });
    }

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

    saveFormSerch(){
       console.log( "this.Form_search.value " , this.Form_search.value);
       this._electronicServicesService.getBeneficiaries(this.Form_search.value)
       this._electronicServicesService.getSuggestion(this.Form_search.value)
       this._electronicServicesService.getRating(this.Form_search.value)
       this._electronicServicesService.getVisitors(this.Form_search.value)
       this._electronicServicesService.getPressCoverageRequest(this.Form_search.value)
       this._electronicServicesService.getVisitRequest(this.Form_search.value)
    }
    clearFormSerch(){
      this.Form_search.reset();
    }
    onChange(items:any){
console.log('fefefgegeg' , items)
    }
    excel(){
        this._electronicServicesService.excel()
    }
    excel_2(){
        this._electronicServicesService.excel_2()
    }
    excel_3(){
        this._electronicServicesService.excel_3()
    }
    excel_4(){
        this._electronicServicesService.excel_4()
    }
    excel_5(){
        this._electronicServicesService.excel_5()
    }
    excel_6(){
        this._electronicServicesService.excel_6()
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
    openDialog(item?: any){
        this._electronicServicesService.displayDialogs(
            'showMessageDialog',
            true,
            item
        );
    }


}
