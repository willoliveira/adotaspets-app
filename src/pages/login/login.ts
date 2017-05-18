import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import firebase from 'firebase';

import { Storage } from '@ionic/storage';

import { AuthenticateProvider } from '../../providers/authenticate/authenticate.service';
import { UserProvider } from '../../providers/user/user.service';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class Login {
	userProfile: any = null;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private fb: Facebook,
		private storage: Storage,
		private authProvider: AuthenticateProvider,
		private userProvider: UserProvider) { }

	public facebookLogin(){
		this.fb.login(['email']).then( (response) => {
			const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

			firebase.auth().signInWithCredential(facebookCredential)
				.then(this.authSuccess.bind(this))
				.catch((error) => {
					console.log("Firebase failure: " + JSON.stringify(error));
				});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	private authSuccess(response) {
		var userInfo = {
			id: response.uid,
			email: response.email, 
			displayName: response.displayName,
			photoURL: response.photoURL
		}

		this.userProvider
			.postUser(response.uid, userInfo)
			.then(this.onSuccessPostUser.bind(this));
	}

	private onSuccessPostUser() {
		console.log(arguments);
		// this.storage.set('uid', response.uid);
		// this.storage.set('userInfo', userInfo);

		// firebase.database().ref('users/' + response.uid).set(userInfo);

		this.goToHome();
	}

	public goToHome() {
		this.navCtrl.push(Home);
	}
}
