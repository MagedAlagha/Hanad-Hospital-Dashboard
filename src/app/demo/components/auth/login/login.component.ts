import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    constructor(
        private layoutService: LayoutService,
        fb: FormBuilder,
        private auth: AuthService
    ) {
        this.loginForm = fb.group({
            Username: [],
            Password: [],
        });
    }

    get filledInput(): boolean {
        return this.layoutService.config.inputStyle === 'filled';
    }
    loginDropdown = new FormControl();
    userID!: string;
    login() {
        /* localStorage.setItem('client', 'client');
		localStorage.setItem('employee', 'employee');
		localStorage.setItem('admin', 'admin');
		localStorage.setItem('managment', 'managment');  */
        /* localStorage.setItem('login', this.userID); */

        this.auth.login(this.loginForm.value).subscribe({
            next: () => {
                console.log('login');
            },
            error: (err: any) => {
                // console.log('error', err);
                // this.messageService.add({
                //     severity: 'error',
                //     summary: ' Message',
                //     detail: value!.body!.Msg,
                // });
            },
        });
    }

    ngOnInit() {
        this.loginDropdown.valueChanges.subscribe((x) => {
            this.userID = x;
        });
    }
}
