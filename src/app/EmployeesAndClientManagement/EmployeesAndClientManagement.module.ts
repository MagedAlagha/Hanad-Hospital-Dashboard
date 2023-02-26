import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesAndClientManagementComponent } from './EmployeesAndClientManagement.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: EmployeesAndClientManagementComponent,
                children: [
                    {
                        path: 'administration',
                        data: { breadcrumb: 'القائمة الرئيسية' },
                        loadChildren: () =>
                            import(
                                './administration/administration.module'
                            ).then((m) => m.AdministrationModule),
                    },
                    {
                        path: 'client',
                        data: { breadcrumb: 'العملاء' },
                        loadChildren: () =>
                            import('./client/client.module').then(
                                (m) => m.ClientModule
                            ),
                    },
                    {
                        path: 'employee',
                        data: { breadcrumb: 'الموظفين' },
                        loadChildren: () =>
                            import('./employee/employee.module').then(
                                (m) => m.EmployeeModule
                            ),
                    },

                ],
            },
        ]),
    ],
    declarations: [EmployeesAndClientManagementComponent],
})
export class EmployeesAndClientManagementModule {}
