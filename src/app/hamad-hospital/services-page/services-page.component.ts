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
    dataTable$!: Observable<any>;
    prostheticsTypesDialog$!: Observable<any>;
    addSubitemModalDialog$!: Observable<any>;
    addMainItemDialog$!: Observable<any>;

    constructor(private _servicesPageService: ServicesPageService) {}

    ngOnInit() {
        this._servicesPageService.getMedicalRehabilitationFeatures();
        this._servicesPageService.getMedicalRehabilitationServices();
        this._servicesPageService.getprosthetics();
        this._servicesPageService.getProstheticsTypes();
        this._servicesPageService.getOutpatientClinicsDepartments();
        this._servicesPageService.getOutpatientClinicsDepartmentsServices();
        this.prostheticsTypesDialog$ = this._servicesPageService
            .Selector$('prostheticsTypesDialog')
            .pipe(tap((value) => {}));
        this.addSubitemModalDialog$ = this._servicesPageService
            .Selector$('addSubitemModalDialog')
            .pipe(tap((value) => {}));
        this.addMainItemDialog$ = this._servicesPageService
            .Selector$('addMainItemDialog')
            .pipe(tap((value) => {}));
    }
}
