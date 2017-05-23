import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserProvider {
	
	constructor() { }
	
	postUser(uid, data) {
		return firebase.database().ref('users/' + uid).set(data);
	}

	getUserOnce(uid) {
		return firebase.database().ref('users/' + uid).once('value');
	}
}
