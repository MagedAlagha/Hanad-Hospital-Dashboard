import { Injectable } from '@angular/core';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr/dist/esm/HubConnection';

@Injectable({
    providedIn: 'root',
})
export class SignalRService {
    hubConnection!: HubConnection;
    audio: any;
    constructor() {}

    createConnection() {
        const options: any = {
            accessTokenFactory: () => {
                return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjkiLCJlbWFpbCI6Im5hc2Vydy5pdEBnbWFpbC5jb20iLCJVc2VySUQiOiIxODUiLCJGdWxsTmFtZSI6ItmG2KfYtdixICDYudio2K_Yp9mE2YTZhyDZiNi02KfYrSIsIkNlbnRlciI6IjAiLCJMYW5nIjoiYXIiLCJFbXBObyI6IjIxOCIsIkZyb21Nb2JpbGUiOiIwIiwibmJmIjoxNjc0OTg2NjA4LCJleHAiOjE2NzU1OTE0MDgsImlhdCI6MTY3NDk4NjYwOH0.REVHc0C2x4b7Ff6lJh0vo0GPWtVwJ2dGMSfMxotnUmc';
            },
        };
        console.log(
            'connectionCreated',
            JSON.parse(localStorage.getItem('CurrentUser')!)?.token
        );
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://hr-api.accessline.ps/Notification', options)
            .configureLogging(LogLevel.Debug)
            .build();

        this.hubConnection
            .start()
            .then(() => {
                console.log('Connection started.');
                this.register();
            })
            .catch((err) => {
                console.log('Opps!');
                console.log(err);
            });
    }

    register(): void {
        this.hubConnection.on('Notification', (res: any) => {
            console.log('registerregister', res);
            this.audio.play();
        });
        this.hubConnection.on('ReceiveMessage', (res: any) => {});
    }
}
