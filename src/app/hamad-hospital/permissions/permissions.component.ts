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
    constructor(
        fb: FormBuilder,
        private _permissionsService: PermissionsService,
        private _usersService:UsersService
    ) {
        this.Form_Permissions = fb.group({
            PermissionID: [],
            ForUserID: [],
            Flag: [],
        });
    }
    ngOnInit(): void {
        this._permissionsService.getPermissions();
        this.Permissions$ = this._permissionsService.Selector$('Permissions');
        this.users$ = this._usersService.Selector$('Users').pipe(map(value=> value.data  ));

      this.Form_Permissions.get('forUserID')?.valueChanges.subscribe(value=>console.log("value 3636" , value))
    }

    save() {
        this._permissionsService.savePermissions(this.Form_Permissions.value);
    }
    clear() {}
}
