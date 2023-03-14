import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable, tap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { PermissionsService } from './permissions.service';

@Component({
    selector: 'app-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent {
    Form_Permissions!: FormGroup;
    Permissions$!: Observable<any>;
    users$!: Observable<any>;
    ForUserID: any;
    ckeck: any;
    Permissions = [];
    constructor(
        fb: FormBuilder,
        private _permissionsService: PermissionsService,
        private _usersService: UsersService
    ) {
        this.Form_Permissions = fb.group({
            ForUserID: [],
        });
    }
    ngOnInit(): void {
        /*  this._permissionsService.getPermissions(); */
        this.Permissions$ = this._permissionsService
            .Selector$('Permissions')
            .pipe(
                map((value) => {
                    return {
                        ...value,
                        data: value.data.map((val: any) => {
                            return {
                                ...val,
                                Checked: val.Checked == 1 ? true : false,
                            };
                        }),
                    };
                }),
                tap((value) => {
                    this.Permissions = value.data;
                })
            );
        this.users$ = this._usersService.Selector$('Users').pipe(
            tap((val: any) => {
                /*  this.Form_Permissions.get('ForUserID')?.setValue(
                    val?.data[0]?.ID
                ); */
            })
        );
    }

    onChange(event: any) {
        console.log('fwwfwf', event.ID);
        this._permissionsService.getPermissions(event.ID);
        this.ForUserID = event.ID;
    }

    save() {
        this._permissionsService
            .savePermissions({
                ...this.Form_Permissions.value,
                PermissionID: this.Permissions.filter(
                    (value: any) => value.Checked
                )
                    .map((value: any) => value?.ID)
                    .join(','),
            })
            .subscribe((value) =>
                this._permissionsService.getPermissions(this.ForUserID)
            );
    }
    clear() {
        this.Form_Permissions.reset();
    }
}
