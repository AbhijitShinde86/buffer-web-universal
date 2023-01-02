import { HttpHeaders } from "@angular/common/http";
import { TransferHttpService } from '@gorniv/ngx-universal';
import { Injectable } from "@angular/core";

import { environment } from '../../environments/environment';

@Injectable({providedIn:'root'})
export class SendInBlueService{
    
    constructor(private http : TransferHttpService){}

    addSubscribeEmail(subscribe :any){
        const listId = environment.sendinblueListId;
        return this.http
        .post(`${environment.sendinblueApiUrl}/v3/contacts`,
            {
                "listIds": [
                    listId
                ],
                "updateEnabled": true,
                "email": subscribe.email
            },
            {
                headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'api-key': `${environment.sendinblueApiKey}`
                })
            }
        );   
    }

    addNewUserEmail(email :any){
        const listId = environment.sendinblueAllusersListId;
        return this.http
        .post(`${environment.sendinblueApiUrl}/v3/contacts`,
            {
                "listIds": [
                    listId
                ],
                "updateEnabled": true,
                "email": email
            },
            {
                headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'api-key': `${environment.sendinblueApiKey}`
                })
            }
        );   
    }

    addVendorEmail(email :any){
        const listId = environment.sendinblueVendorsListId;
        return this.http
        .post(`${environment.sendinblueApiUrl}/v3/contacts`,
            {
                "listIds": [
                    listId
                ],
                "updateEnabled": true,
                "email": email
            },
            {
                headers: new HttpHeaders({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'api-key': `${environment.sendinblueApiKey}`
                })
            }
        );   
    }
    
    
}