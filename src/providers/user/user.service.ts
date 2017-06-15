import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import Config from '../../utils/Config.ts';


@Injectable()
export class UserProvider {

    constructor(public http: Http) { }

	/**
	 * Cria um novo usuario
	 * @param userId
	 * @param data
	 */
	postUser(data) {
		// return firebase.database().ref(`users/${userId}`).set(data);
        // return this.http.post(`${Config.api_url}/v1/user`, data);
        return this.http
            .post(`${Config.api_url}/v1/user`, data)
            .map((response: Response) => response.json());
	}

	/**
	 * Pega dos dados do usuario
	 * @param userId
	 */
	getUserByEmail(userEmail) {
		// return firebase.database().ref(`users/${userId}`).once('value');
        return this.http
            .get(`${Config.api_url}/v1/user/email/${userEmail}`)
            .map(response => response.json());;
	}

    /**
	 * Pega dos dados dos pets do user
	 * @param userId
	 */
	getPetToUser(userId) {
		// return getPetToUser(userId).once("value");
        return this.http
            .get(`${Config.api_url}/v1/user/${userId}/pets`)
            .map((response: Response) => response.json());
	}
}
