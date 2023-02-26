import { CustomerPageComponent } from './customer-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFormCustomerComponent } from './add-form-customer/add-form-customer.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AddFormCustomerComponent, CustomerPageComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: CustomerPageComponent,
            },
        ]),
    ],
})
export class CustomerPageModule {}
