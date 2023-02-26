import { TranslateService } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
    Component,
    OnInit,
    forwardRef,
    OnDestroy,
    Input,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    FormControl,
    AbstractControl,
    ValidationErrors,
    Validators,
    Validator,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { ValidationComponent } from '../validation/validation.component';
import { MessageService } from 'primeng/api';
import { TranslationModule } from 'src/app/i18n';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        EditorModule,
        ValidationComponent,
        TranslationModule,
        FormsModule,
        InputTextModule,
        ReactiveFormsModule,
    ],
    selector: 'app-editor-field',
    templateUrl: './editor-field.component.html',
    styleUrls: ['./editor-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditorFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: EditorFieldComponent,
            multi: true,
        },
    ],
})
export class EditorFieldComponent
    implements OnInit, OnDestroy, ControlValueAccessor, Validator, OnChanges
{
    required: boolean = false;
    @Input() submitted: boolean = false;
    @Input() label: string = '';
    disabled: boolean = false;
    AbstractControl = new FormControl();
    valueChangesSubscription!: Subscription;
    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}
    onChange: any = () => {};
    onTouch: any = () => {};
    writeValue(value: any) {
        this.AbstractControl.setValue(value);
        if (!value && value != 0) {
            this.AbstractControl.reset();
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
                this.AbstractControl.setValidators(Validators.required);
            }
        });
        return null;
    }
    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.AbstractControl.disable();
        } else {
            this.AbstractControl.enable();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['submitted']) {
            if (this.submitted && this.AbstractControl.invalid) {
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
            this.AbstractControl.valueChanges.subscribe((value) => {
                this.onChange(value);
            });
    }

    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
