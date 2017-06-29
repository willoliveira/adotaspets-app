import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import Config from '../utils/Config.ts';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class UserService {
    constructor(public http: Http) {}

    /**
     * Cria um novo usuario
     * @param data
    */
	postUser(data) {
        return this.http
            .post(`${Config.api_url}/v1/user`, data)
            .map((res:Response) => res.json())
            .catch((err:any) => Observable.throw(err.json().message || 'Erro no servidor'));
	}

	/**
	 * Pega dos dados do usuario
	 * @param userEmail
	*/
	getUserByEmail(userEmail) {
        return this.http
            .get(`${Config.api_url}/v1/user/email/${userEmail}`)
            .map((res:Response) => res.json())
            .catch((err:any) => Observable.throw(err.json().message || 'Erro no servidor'));
	}

    /**
	 * Pega dos dados dos pets do user
	 * @param userId
	*/
	getPetToUser(userId) {
        return this.http
            .get(`${Config.api_url}/v1/user/${userId}/pets`)
            .map((res:Response) => res.json())
            .catch((err:any) => Observable.throw(err.json().message || 'Erro no servidor'));
	}

    /**
	 * Busca o pet mais proximo de acordo com os filtros
	 * @param data
	*/
	getPetByLocUser(data) {
        return this.http
            .post(`${Config.api_url}/v1/1getPetByLocUser`, data)
            .map((res:Response) => res.json())
            .catch((err:any) => Observable.throw(err.json().message || 'Erro no servidor'));
	}
}
