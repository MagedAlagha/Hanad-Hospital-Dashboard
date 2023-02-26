import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationComponent } from './administration.component';
import { TicketComponent } from './ticket/ticket.component';
import { ButtonComponentComponent } from '../../shared/Module-shared/button-component/button-component.component';

@NgModule({
    declarations: [AdministrationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: AdministrationComponent,
                children: [
                    {
                        path: 'clients',
                        data: { breadcrumb: 'العملاء' },
                        loadChildren: () =>
                            import('./clients/clients.module').then(
                                (m) => m.ClientsModule
                            ),
                    },
                    {
                        path: 'employees',
                        data: { breadcrumb: 'الموظفين' },
                        loadChildren: () =>
                            import('./employees/employees.module').then(
                                (m) => m.EmployeesModule
                            ),
                    },
                    {
                        path: 'projects',
                        data: { breadcrumb: 'المشاريع' },
                        loadChildren: () =>
                            import('./projects/projects.module').then(
                                (m) => m.ProjectsModule
                            ),
                    },
                    {
                        path: 'contracts',
                        data: { breadcrumb: 'العقود' },
                        loadChildren: () =>
                            import('./contracts/contracts.module').then(
                                (m) => m.ContractsModule
                            ),
                    },
                    {
                        path: 'ticket',
                        data: { breadcrumb: 'معالجة التذاكر والدعم الفني' },
                        loadChildren: () =>
                            import('./ticket/ticket.module').then(
                                (m) => m.TicketModule
                            ),
                    },
                ],
            },
        ]),
        ButtonComponentComponent,
    ],
})
export class AdministrationModule {}
