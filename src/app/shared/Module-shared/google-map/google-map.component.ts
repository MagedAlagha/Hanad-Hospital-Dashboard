import { TranslationModule } from './../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
    standalone: true,
    imports: [CommonModule,TranslationModule],
    selector: 'app-google-map',
    templateUrl: './google-map.component.html',
    styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit , ControlValueAccessor {
    constructor() {}
    onChange: any = () => {};
    onTouch: any = () => {};
    val = '';
    set value(val: any) {
   this.val = val;
    }

    writeValue(value: any) {

        this.val = value;
    }
    registerOnChange(fn: any) {

        this.onChange = fn;
    }
    registerOnTouched(fn: any) {

        this.onTouch = fn;
    }

    ngOnInit() {}
}
