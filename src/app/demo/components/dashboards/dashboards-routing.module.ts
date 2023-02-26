import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'الإحصائيات'}, loadChildren: () => import('./saas/saas.dashboard.module').then(m => m.SaaSDashboardModule) },
        { path: 'dashboard-sales', data: {breadcrumb: 'صفحة المشتريات'}, loadChildren: () => import('./sales/sales.dashboard.module').then(m => m.SalesDashboardModule) }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
