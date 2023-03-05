import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
            Username: ['' , Validators.required],
            Password: ['', Validators.required],
        });
    }

    get filledInput(): boolean {
        return this.layoutService.config.inputStyle === 'filled';
    }
    loginDropdown = new FormControl();
    userID!: string;
    login() {
        console.log(this.loginForm.value , "'''''")
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
