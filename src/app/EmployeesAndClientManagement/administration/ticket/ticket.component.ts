import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketService } from './ticket.service';

@Component({
    selector: 'app-ticket',
    templateUrl: './ticket.component.html',
    styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent {
    replayTicket$!:Observable<any>
    dataTable: any[] = [];
    showData:boolean = false;
    constructor(private _ticketService: TicketService) {}

    ngOnInit() {
        this.dataTable = this._ticketService.getAll();
        this.replayTicket$ = this._ticketService.Selector$( 'replayTicket');
    }


    addReplayDialog(item?: any) {
        this._ticketService.displayDialogs(
            'replayTicket',
            true,
            item
        );
        console.log(item)
    }
    showReplayDialog(item?: any) {
        this._ticketService.displayDialogs(
            'replayTicket',
            true,
            {...item , showData:this.showData = true }
        );
    }

}
