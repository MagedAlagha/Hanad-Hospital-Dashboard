import { TranslationModule } from './../../../i18n/translation.module';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutoCompleteFeildService } from './auto-complete-feild-multiple.service';
import { ValidationComponent } from '../validation/validation.component';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        AutoCompleteModule,
        FormsModule,
        ValidationComponent,
        TranslationModule,
    ],
    selector: 'app-auto-complete-feild-multiple',
    templateUrl: './auto-complete-feild-multiple.component.html',
    styleUrls: ['./auto-complete-feild-multiple.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutoCompleteFeildComponentMultiple),
            multi: true,
        },
    ],
})
export class AutoCompleteFeildComponentMultiple
    implements OnInit, ControlValueAccessor
{
    @Input() submitted: boolean = false;
    @Input() isLabel: boolean = true;
    @Input() field: string = 'Name';
    @Input() label: string = 'Code';
    @Input() tableName: string = '';
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;

    @Output() onUnSelection = new EventEmitter();
    @Output() onSelectionChange = new EventEmitter();
    dataFilter: any[] = [];
    constructor(private _autoCompleteFeildService: AutoCompleteFeildService) {}
    onChange: any = () => {};
    onTouch: any = () => {};
    valueAutoComplete: any[] = [];
    set value(val: any) {
        this.onChange(val);
        this.onTouch(val);
    }

    writeValue(value: any) {
        this.valueAutoComplete = value;
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    ngOnInit() {}

    filter(event: any) {
        const query = event.query;
        this._autoCompleteFeildService
            .search(this.tableName, query)
            .subscribe((value) => {
                this.dataFilter = value;
            });
    }

    onSelect(value: any) {
        this.value = value;
        this.onSelectionChange.emit(value);
    }
    onUnselect(value: any) {
        this.value = value;
        this.onUnSelection.emit(value);
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }
}
