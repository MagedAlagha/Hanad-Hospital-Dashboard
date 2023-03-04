import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-about-hospital',
    templateUrl: './about-hospital.component.html',
    styleUrls: ['./about-hospital.component.scss'],
})
export class AboutHospitalComponent {
    text2: any;
    FormEditor!: FormGroup<any>;
    clear() {}
    constructor(private fb: FormBuilder) {
        this.FormEditor = fb.group({
            description: [''],
        });
    }

    save() {
        console.log(this.FormEditor.value)
    }
}
