import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServicesPageService } from './services-page.service';

@Component({
    selector: 'app-services-page',
    templateUrl: './services-page.component.html',
    styleUrls: ['./services-page.component.scss'],
})
export class ServicesPageComponent implements OnInit {
    formServicesPage!: FormGroup<any>;
    dataTable$!: Observable<any>;

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
    }
}
