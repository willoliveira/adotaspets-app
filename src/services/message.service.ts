import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {Observable} from 'rxjs/Observable';

import Config from '../utils/Config.ts';

@Injectable()
export class MessageService {

	constructor(public http: Http) { }

	getRoomsByUser(userId): Observable<any> {
        return this.http
            .get(`${Config.api_url}/v1/room/user/${userId}`)
            .map((response: Response) => response.json());

    }

    getRoomByUserAndParticipant(params): Observable<any> {
        return this.http
            .get(`${Config.api_url}/v1/room/user/${params.userId}/participant/${params.participantId}`)
            .map((response: Response) => response.json());
    }

    getRoomMessages(params): Observable<any> {
        let url = `${Config.api_url}/v1/room/${params.roomId}/messages/?size=10`;
        if (params.date) {
            url += `&date=${params.date}`;
        }
        return this.http
            .get(url)
            .map((response: Response) => response.json());
    }
}
