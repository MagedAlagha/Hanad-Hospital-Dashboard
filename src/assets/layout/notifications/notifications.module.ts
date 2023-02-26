import { IconSharedComponent } from 'src/app/shared/Module-shared/icon-shared/icon-shared.component';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { SidebarModule } from 'primeng/sidebar';
import { TagModule } from 'primeng/tag';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SidebarModule,
        TooltipModule,
        BadgeModule,
        IconSharedComponent,
        TagModule,
    ],
    declarations: [NotificationsComponent],
    exports: [NotificationsComponent],
})
export class NotificationsModule {}
