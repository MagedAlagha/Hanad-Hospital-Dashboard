import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
    Notifications$!: Observable<any>;

    constructor(public layoutService: LayoutService, private router: Router) {}
    get visible(): boolean {
        return this.layoutService.state.notificationsSidebarVisible;
    }
    set visible(_val: boolean) {
        this.layoutService.state.notificationsSidebarVisible = _val;
    }
    ngOnInit() {
        this.Notifications$ = of([
            {
                id: 236211,
                activity_type: 20,
                source_id: 14,
                created_time: '2023-02-18T01:00:00.787',
                text: '  اضافة مقالة طبية',
                message :'تمت الاضافة بنجاح' ,
                is_read: false,
            },
            {
                id: 236211,
                activity_type: 20,
                source_id: 14,
                created_time: '2023-02-18T01:00:00.787',
                text: '  هذا النص يمكن ان يستبدل',
                message :'تمت الاضافة بنجاح' ,
                is_read: false,
            },
            {
                id: 236211,
                activity_type: 20,
                source_id: 14,
                created_time: '2023-02-18T01:00:00.787',
                text: 'عنوان الاشعار  ',
                message :'تمت الاضافة بنجاح' ,
                is_read: true,
            },
            {
                id: 236211,
                activity_type: 20,
                source_id: 14,
                created_time: '2023-02-18T01:00:00.787',
                text: ' تمت اضافة خبر جديد',
                message :'تمت الاضافة بنجاح' ,
                is_read: true,
            },
        ]);
    }

     navigate(item: any) {
       /*  if (item.href != '#') {
            this.router.navigate([item.href]);
        } */
        this.router.navigate(['/evaluation']);
    }
    ReadAll(Notifications: any) {
        const notif = Notifications.Notifications.filter(
            (val: any) => !val.is_read
        ).map((val: any) => val.id);

        console.log('notif', notif.join(','));
    }
}
