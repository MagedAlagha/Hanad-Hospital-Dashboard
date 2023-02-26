import { Subscription } from 'rxjs';
import { TranslationModule } from './../../../i18n/translation.module';
import {
    Component,
    forwardRef,
    Input,
    OnInit,
    Output,
    EventEmitter,
    SimpleChanges,
    OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormsModule,
    AbstractControl,
    ReactiveFormsModule,
    NG_VALIDATORS,
    FormControl,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { ValidationComponent } from '../validation/validation.component';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        InputTextModule,
        ValidationComponent,
        TranslationModule,
        ReactiveFormsModule,
    ],
    selector: 'app-search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: SearchFieldComponent,
            multi: true,
        },
    ],
})
export class SearchFieldComponent
    implements OnInit, OnDestroy, ControlValueAccessor
{
    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}
    @Input() label: string = '';
    @Input() placeholder: string = 'بحث';
    @Input() submitted: boolean = false;
    disabled: boolean = false;
    required: boolean = false;
    @Output() Enter = new EventEmitter<any>();
    searchFieldControl = new FormControl();
    onChange: any = () => {};
    onTouch: any = () => {};
    valueChangesSubscription!: Subscription;
    writeValue(value: any) {
        this.searchFieldControl.setValue(value);
        if (!value && value != 0) {
            this.searchFieldControl.reset();
        }
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    onEnter(event: any) {
        this.Enter.emit(event.target.value);
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        Object.keys(control.errors! || {}).forEach((key) => {
            if (key == 'required') {
                this.required = true;
                this.searchFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }
    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.searchFieldControl.disable();
        } else {
            this.searchFieldControl.enable();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['submitted']) {
            if (this.submitted && this.searchFieldControl.invalid) {
                this.messageService.add({
                    severity: 'error',
                    summary: `${this._translateService.instant(
                        this.label
                    )} ${this._translateService.instant('Shared.IS_REQUIRED')}`,
                    detail: '',
                });
            }
        }
    }
    ngOnInit() {
        this.valueChangesSubscription =
            this.searchFieldControl.valueChanges.subscribe((value) => {
                this.onChange(value);
            });
    }
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
