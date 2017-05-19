import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';

@Injectable()
export class AuthenticateProvider {

	constructor(private fb: Facebook) { }

	loginFace(params) {
		return this.fb.login(params);
	}

	authFace(accessToken) {
		var facebookCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
		return firebase.auth().signInWithCredential(facebookCredential);
	}
}
