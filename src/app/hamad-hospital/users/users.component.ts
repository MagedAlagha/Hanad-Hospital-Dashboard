import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from './users.service';
import * as console from 'console';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    Form_User!: FormGroup;
    users$!:Observable<any>;
    constructor(fb: FormBuilder ,
    private _usersService:UsersService ,
    private messageService: MessageService,
    private _translateService: TranslateService
) {
        this.Form_User = fb.group({
            ID:[],
            FullName: [null , Validators.required],
            UserName: [null , Validators.required],
            Password: [null , Validators.required],
            IsSuperAdmin: [],
        });
    }
    ngOnInit(): void {
        this.users$ = this._usersService.Selector$('Users');
    }

    save() {
            if (this.Form_User.invalid) {
                this.messageService.add({
                    severity: 'error',
                    detail: this._translateService.instant(
                        'الحقول مطلوبة'
                    ),
                });
            } else{
                this._usersService.saveUsers(this.Form_User.value);
                this.clear()
            }
            }

    editItem(item:any){
      this.Form_User.patchValue(item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    clear() {}
}
