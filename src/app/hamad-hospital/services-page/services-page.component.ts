import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { ServicesPageService } from './services-page.service';

@Component({
    selector: 'app-services-page',
    templateUrl: './services-page.component.html',
    styleUrls: ['./services-page.component.scss'],
})
export class ServicesPageComponent implements OnInit {
    formServicesPage!: FormGroup<any>;
    dataTable$!: Observable<any>;
    prostheticsTypesDialog$!: Observable<any>;

    constructor(
        fb: FormBuilder,
        private _servicesPageService: ServicesPageService
    ) {
        this.formServicesPage = fb.group({
            id: [''],
            nameAr: [''],
            nameEn: [''],
            isActive: [''],
            sorting: [0],
        });
    }

    ngOnInit() {
        this._servicesPageService.getMedicalRehabilitationFeatures();
        this._servicesPageService.getMedicalRehabilitationServices();
        this._servicesPageService.getprosthetics();
        this._servicesPageService.getProstheticsTypes();
        this.prostheticsTypesDialog$ = this._servicesPageService.Selector$(
            'prostheticsTypesDialog'
        ).pipe(tap(value=>{
        }))
    }




}
