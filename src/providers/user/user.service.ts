import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserProvider {

	/**
	 * Cria um novo usuario
	 * @param userId
	 * @param data 
	 */
	postUser(userId, data) {
		return firebase.database().ref('users/' + userId).set(data);
	}

	/**
	 * Pega dos dados do usuario
	 * @param userId 
	 */
	getUserOnce(userId) {
		return firebase.database().ref('users/' + userId).once('value');
	}

}