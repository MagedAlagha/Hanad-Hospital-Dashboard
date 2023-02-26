import { Subscription } from 'rxjs';
import { TranslationModule } from './../../../i18n/translation.module';
import { ValidationComponent } from 'src/app/shared/Module-shared/validation/validation.component';
import { CommonModule } from '@angular/common';
import {
    Component,
    OnInit,
    forwardRef,
    Input,
    Optional,
    OnChanges,
    SimpleChanges,
    OnDestroy,
    Output,
    EventEmitter,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    FormsModule,
    NG_VALIDATORS,
    Validator,
    AbstractControl,
    ValidationErrors,
    NgModel,
    NgControl,
    FormControl,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        InputNumberModule,
        ValidationComponent,
        TranslationModule,
        ReactiveFormsModule,
    ],
    selector: 'app-input-number-field',
    templateUrl: './input-number-field.component.html',
    styleUrls: ['./input-number-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputNumberFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: InputNumberFieldComponent,
            multi: true,
        },
    ],
})
export class InputNumberFieldComponent
    implements OnInit, ControlValueAccessor, OnDestroy, Validator, OnChanges
{
    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}

    @Input() submitted: boolean = false;
    @Input() label: string = '';
    @Input() prefix: any = '';
    @Input() suffix: any = '';
    @Input() mode: any = 'decimal';
    @Input() labelSideField: any = '';

    @Input() maxFractionDigits: number = 5;
    @Input() min: any = 0;
    @Input() max: any = null;
    @Input() useGrouping: boolean = false;
    required: boolean = false;
    IdNoInvalid: boolean = false;
    @Input() disabled: boolean = false;
    @Input() isPresentag: boolean = false;
    @Input() isIdentityNumber: boolean = false;
    @Input() showButtons: boolean = false;
    @Output() onInput = new EventEmitter();
    ngModelSubscription: Subscription | undefined;
    numberFieldControl = new FormControl(null);
    onChange: any = () => {};
    onTouch: any = () => {};
    InputControl: any;
    valueChangesSubscription!: Subscription;
    writeValue(value: any) {
        this.numberFieldControl.setValue(value, { emitEvent: false });
        if (!value && value != 0) {
            this.numberFieldControl.reset();
        }
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        Object.keys(control.errors! || {}).forEach((key) => {
            if (key == 'required') {
                this.required = true;
                this.numberFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }

    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.numberFieldControl.disable();
        } else {
            this.numberFieldControl.enable();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['submitted']) {
            if (this.submitted && this.numberFieldControl.invalid) {
                this.messageService.add({
                    severity: 'error',
                    summary: `${this._translateService.instant(
                        this.label
                    )} ${this._translateService.instant('Shared.IS_REQUIRED')}`,
                    detail: '',
                });
            } else if (this.IdNoInvalid && this.numberFieldControl.invalid) {
                this.messageService.add({
                    severity: 'error',
                    summary: `رقم الهوية غير صالح`,
                    detail: '',
                });
            }
        }
    }
    ngOnInit() {
        // yousf should make unsubscribe here
        this.valueChangesSubscription =
            this.numberFieldControl.valueChanges.subscribe((value) => {
                this.Change(value);
            });
    }
    Change(value: any) {
        if (this.max && value > this.max) {
            this.messageService.add({
                severity: 'error',
                summary: `لا يمكنك ادخال رقم اكبر من ${this.max}`,
                detail: '',
            });
        } else {
            this.onInput.emit(value);
            this.onChange(value);
        }
    }
    CheckIdNo(val: any) {
        const value = val.target.value;
        if (this.isIdentityNumber && value && !this.isIDNO(value)) {
            this.messageService.add({
                severity: 'error',
                summary: `رقم الهوية غير صالح`,
                detail: '',
            });
            this.numberFieldControl.setErrors({ NotIdNo: true });
            this.IdNoInvalid = true;
        } else if (this.required) {
            this.numberFieldControl.clearValidators();
            this.IdNoInvalid = false;
            this.numberFieldControl.setValidators(Validators.required);
        } else {
            this.numberFieldControl.clearValidators();
            this.IdNoInvalid = false;
        }
    }
    isIDNO(ControlVal: any) {
        const value = ControlVal;
        if (!value || value == '') return true;
        if (!/^\d{9}$/.test(value)) {
            return false;
        }

        let lastDigit = value.substr(8);
        let rest = value.substr(0, 8);
        let sum = 0;
        for (var j = 0; j < 8; j++) {
            if (parseInt(rest[j]) != 9) {
                let m = (j % 2) + 1;
                sum = sum + ((parseInt(rest[j]) * m) % 9);
            } else {
                sum = sum + 9;
            }
        }

        let check = (10 - (sum % 10)) % 10;
        if (check == parseInt(lastDigit)) {
            return true;
        } else {
            return false;
        }
    }
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
