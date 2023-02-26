import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { MessageService } from 'primeng/api';

@NgModule({
    imports: [AppLayoutModule, AppRoutingModule, TranslateModule.forRoot()],
    declarations: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        MessageService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
