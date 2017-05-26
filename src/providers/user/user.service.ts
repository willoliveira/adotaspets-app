import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserProvider {

	constructor() { }

	postUser(userId, data) {
		return firebase.database().ref('users/' + userId).set(data);
	}

	getUserOnce(userId) {
		return firebase.database().ref('users/' + userId).once('value');
	}


    getPetToUser(userId) {
		return firebase.database().ref(`pets/`).orderByChild("userId").equalTo(userId);
	}

    getPetToUserOnce(userId) {
		return this.getPetToUser(userId).once("value");
	}
}
