import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from './users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    Form_User!: FormGroup;
    users$!:Observable<any>;
    constructor(fb: FormBuilder , private _usersService:UsersService) {
        this.Form_User = fb.group({
            FullName: [],
            UserName: [],
            Password: [],
            IsSuperAdmin: [],
        });
    }
    ngOnInit(): void {
        this.users$ = this._usersService.Selector$('Users');
    }

    save() {
        this._usersService.saveUsers(this.Form_User.value);
    }
    clear() {}
}
