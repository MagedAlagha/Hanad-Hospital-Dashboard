import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { CustomerPageComponent } from './customer-page/customer-page.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: EmployeeComponent,
                children: [
                    {
                        path: 'customer-page',
                        data: { breadcrumb: 'الصفحة الرئيسية' },
                        loadChildren: () =>
                            import('./customer-page/customer-page.module').then(
                                (m) => m.CustomerPageModule
                            ),
                    },
                ],
            },
        ]),
    ],
    declarations: [EmployeeComponent],
})
export class EmployeeModule {}
