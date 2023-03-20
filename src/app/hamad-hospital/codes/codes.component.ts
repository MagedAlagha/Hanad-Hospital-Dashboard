import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { CodesService } from './codes.service';

@Component({
    selector: 'app-codes',
    templateUrl: './codes.component.html',
    styleUrls: ['./codes.component.scss'],
})
export class CodesComponent {
    Form_Codes!: FormGroup;
    users$!: Observable<any>;
    codes$!: Observable<any>;
    codesParent$!: Observable<any>;
    ParentD: any;
    ckeck: any;
    Permissions = [];
    ID:any;
    constructor(
        fb: FormBuilder,
        private _codesService: CodesService,
        private _usersService: UsersService
    ) {
        this.Form_Codes = fb.group({
            Parent: [],
            Name: [],
            Eng: [],
        });
    }
    ngOnInit(): void {
        this.codes$ = this._codesService.Selector$('codes').pipe(
            tap((value) => {
                console.log('ppppppp', value);
            })
        );
        this._codesService.getCodesParent();
        this.codesParent$ = this._codesService.Selector$('codesParent').pipe(
            tap((value) => {
                console.log('value ...', value);
            })
        );
    }

    onChange(event: any) {
        console.log('fwwfwf', event.Code);
        this._codesService.getCodes(event.Code);
        this.ParentD = event.Code;
    }

    save() {
        this._codesService
            .saveCodes({
                ...this.Form_Codes.value,
                Eng: this.Form_Codes.get('Name')?.value,
            })
            .subscribe((value) => this._codesService.getCodes(this.ParentD));
    }
    clear() {
        this.Form_Codes.reset();
    }

    editItem(item: any) {
        this.Form_Codes.patchValue(item);
        this.ID = item.ID;
    }
    deleteItem(item: any) {
        this._codesService.deleteCodes(item.ID).subscribe(value=>{
            this._codesService.getCodes(this.ParentD);
        });
    }
}
