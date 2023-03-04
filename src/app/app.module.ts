import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './Services/interceptor.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
        TranslateModule.forRoot(),
        ConfirmDialogModule,
        ToastModule,
    ],
    declarations: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MessageService,
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
