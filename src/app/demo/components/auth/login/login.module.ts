import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AppConfigModule } from 'src/app/layout/config/config.module';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ReactiveFormsModule } from '@angular/forms';
import {CaptchaModule} from 'primeng/captcha';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        AppConfigModule,
        DropdownModule,
        PasswordModule,
        ReactiveFormsModule,
        CaptchaModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule { }
