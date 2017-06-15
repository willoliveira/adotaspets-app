import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

// import firebase from 'firebase';
// import GeoFire from 'geofire';

@Injectable()
export class AuthenticateProvider {

	constructor(private fb: Facebook) { }

	loginFace(params) {
		return this.fb.login(params)
			.then(() => {
				this.getProfileFace().then(response => {
					console.log(response);
					Promise.resolve(response);
				});
			});
	}

	getProfileFace() {
		// var facebookCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
		// return firebase.auth().signInWithCredential(facebookCredential);
		return this.fb.api("me?fields=name,gender,email", [""]);
	}
}
