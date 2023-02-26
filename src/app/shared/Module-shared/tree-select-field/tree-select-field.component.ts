import { Subscription } from 'rxjs';
import { TranslationModule } from '../../../i18n/translation.module';
import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnInit,
    forwardRef,
    Output,
    EventEmitter,
    SimpleChanges,
    OnDestroy,
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
import { DropdownModule } from 'primeng/dropdown';
import { ValidationComponent } from '../validation/validation.component';
import { SpinnerLoadingComponent } from '../spinner-loading/spinner-loading.component';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    standalone: true,
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        ValidationComponent,
        TranslationModule,
        SpinnerLoadingComponent,
        ReactiveFormsModule,
    ],
    selector: 'app-tree-select-field',
    templateUrl: './tree-select-field.component.html',
    styleUrls: ['./tree-select-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TreeSelectFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: TreeSelectFieldComponent,
            multi: true,
        },
    ],
})
export class TreeSelectFieldComponent
    implements OnInit, OnDestroy, ControlValueAccessor
{
    @Input() doActionSelectWhenSetValue: boolean = false;
    @Input() submitted: boolean = false;
    @Input() label: string = '';
    required: boolean = false;
    @Input() dropdownItems: any[] = [];
    @Input() optionLabel: string = 'Name';
    @Input() optionValue: string = 'Code';
    @Input() filter: boolean = false;
    @Input() loading: boolean = false;
    @Input() emptyOption: boolean = false;
    @Input() isLabel: boolean = true;
    @Input() placeholder: string = 'Shared.Select';

    @Output() onSelectionChange = new EventEmitter<any>();
    dropdownItemsForComponent: any = [];
    selectFieldControl = new FormControl();
    valueChangesSubscription!: Subscription;
    constructor(
        private messageService: MessageService,
        private _translateService: TranslateService
    ) {}
    onChange: any = () => {};
    onTouch: any = () => {};

    writeValue(value: any) {
        if (typeof value == 'string') {
            this.selectFieldControl.setValue(+value);
            if (this.doActionSelectWhenSetValue) {
                this.Change(value);
            }
        } else {
            this.selectFieldControl.setValue(value);
            if (this.doActionSelectWhenSetValue) {
                this.Change(value);
            }
        }
        if (!value && value != 0) {
            this.selectFieldControl.reset();
        }
    }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    Change($event: any) {
        this.onChange($event);
        const dataSelected = this.dropdownItems.find(
            (value) => value[this.optionValue] == $event
        );
        this.onSelectionChange.emit(dataSelected);
    }

    validate(control: AbstractControl<any, any>): ValidationErrors | null {
        Object.keys(control.errors! || {}).forEach((key) => {
            if (key == 'required') {
                this.required = true;
                this.selectFieldControl.setValidators(Validators.required);
            }
        });
        return null;
    }

    setDisabledState(isDisabled: boolean) {
        if (isDisabled) {
            this.selectFieldControl.disable();
        } else {
            this.selectFieldControl.enable();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['submitted']) {
            if (this.submitted && this.selectFieldControl.invalid) {
                this.messageService.add({
                    severity: 'error',
                    summary: `${this._translateService.instant(
                        this.label
                    )} ${this._translateService.instant('Shared.IS_REQUIRED')}`,
                    detail: '',
                });
            }
        }
        // if (changes['dropdownItems']) {
        //     if (this.dropdownItems) {
        //         this.dropdownItems.map((element) => {
        //             if (element?.IsDefault) {
        //                 if (this.selectFieldControl.value != element.Code) {
        //                     this.selectFieldControl.setValue(element.Code);
        //                     this.onSelectionChange.emit(element);
        //                 }
        //             }
        //         });
        //     }
        // }
        if (changes['dropdownItems']) {
            if (this.dropdownItems) {
                this.dropdownItemsForComponent = [...this.dropdownItems];
            }
            if (
                this.dropdownItemsForComponent &&
                this.dropdownItemsForComponent.length >= 6
            ) {
                this.filter = true;
            }

            if (
                this.dropdownItemsForComponent &&
                this.dropdownItemsForComponent.length > 0 &&
                this.emptyOption
            ) {
                console.log(
                    'this.dropdownItems',
                    this.dropdownItemsForComponent
                );
                let emptyValue = `{"${this.optionLabel}": "غير محدد","${this.optionValue}":"null" }`;
                this.dropdownItemsForComponent.unshift(JSON.parse(emptyValue));
            }
        }
    }
    ngOnInit() {
        // yousf should make unsubscribe here/ok
        this.valueChangesSubscription =
            this.selectFieldControl.valueChanges.subscribe((value) => {
                this.onChange(value);
            });
    }
    ngOnDestroy() {
        this.valueChangesSubscription.unsubscribe();
    }
}
