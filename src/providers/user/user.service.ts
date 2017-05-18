import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import firebase from 'firebase';

@Injectable()
export class UserProvider {
	
	constructor(public http: Http) { }
	
	postUser(uid, data) {
		return firebase.database().ref('users/' + uid).set(data);
	}
}
