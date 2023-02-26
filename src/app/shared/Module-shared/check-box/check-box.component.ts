import { TranslationModule } from './../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    FormsModule,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ValidationComponent } from '../validation/validation.component';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        CheckboxModule,
        ReactiveFormsModule,
        ValidationComponent,
        TranslationModule,
    ],
    selector: 'app-check-box',
    templateUrl: './check-box.component.html',
    //   styleUrls: ['./check-box.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckBoxComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CheckBoxComponent,
            multi: true,
        },
    ],
})
export class CheckBoxComponent
    implements OnInit, OnDestroy, ControlValueAccessor
{
    required: boolean = false;
    @Input() label: string = '';
    @Input() disabled: boolean = false;
    @Input() submitted: boolean = false;
    @Output() change = new EventEmitter<any>();

    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}
    onChange: any = () => {};
    onTouch: any = () => {};
    checkboxFieldControl = new FormControl();
    valueChangesSubscription!: Subscription;
    writeValue(value: any) {
        this.checkboxFieldControl.setValue(value);
        if (!value && value != 0 && value != false) {
            this.checkboxFieldControl.reset();
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
                this.checkboxFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }
    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.checkboxFieldControl.disable();
        } else {
            this.checkboxFieldControl.enable();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['submitted']) {
            if (this.submitted && this.checkboxFieldControl.invalid) {
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
            this.checkboxFieldControl.valueChanges.subscribe((value) => {
                this.onChange(value);
                this.change.emit(value);
            });
    }
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
