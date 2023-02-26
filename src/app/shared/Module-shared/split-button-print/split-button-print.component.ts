import { ProcurementService } from './../../../MAEL_SYSTEM/Procurement/ProcurementSystem.service';
import { Component, OnInit, Input } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitButtonPrintService } from './split-button-print.service';

@Component({
    standalone: true,
    imports: [SplitButtonModule],
    selector: 'app-split-button-print',
    templateUrl: './split-button-print.component.html',
    styleUrls: ['./split-button-print.component.scss'],
})
export class SplitButtonPrintComponent implements OnInit {
    items!: any[];
    @Input() URL: string = '';
    @Input() ScreenName: string = '';
    @Input() params: any;
    @Input() hr: boolean = false;

    @Input() OutputType: any = 'p';
    constructor(
        private _splitButtonPrintService: SplitButtonPrintService,
        private _procurementService: ProcurementService
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'PDF',
                icon: 'pi pi-file-pdf',
                command: () => {
                    this.Print();
                },
            },
            {
                label: 'Excel',
                icon: 'pi pi-file-excel',
                command: () => {
                    this.Print('e');
                },
            },
            {
                label: 'Word',
                icon: 'pi pi-file',
                command: () => {
                    this.Print('w');
                },
            },
        ];
    }
    Print(type: string = 'p') {
        this._splitButtonPrintService.getReports(
            this.URL,
            type,
            this.ScreenName == 'proc'
                ? { OrderNo: this._procurementService.OrderNoSelected }
                : this.params,
            this.hr
        );
    }
}
