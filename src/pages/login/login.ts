import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import firebase from 'firebase';

import { Storage } from '@ionic/storage';

import { User } from '../../models/user.model';

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
		private storage: Storage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Login');

		var user: User;
		console.log(user);
	}

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
			console.log(error)
		});
	}

	private authSuccess(response) {
		var userInfo = {
			id: response.uid,
			email: response.email, 
			displayName: response.displayName,
			photoURL: response.photoURL
		}

		localStorage.setItem('uid', response.uid);
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
		this.storage.set('uid', response.uid);
		this.storage.set('userInfo', userInfo);

		firebase.database().ref('users/' + response.uid).set(userInfo);

		this.goToHome();
	}
	public goToHome() {
		this.navCtrl.push(Home);
	}

	//public facebookLogin() {
		//this.navCtrl.push(Home);
		
		//this.fb.login(['public_profile', 'user_friends', 'email']).then((res: FacebookLoginResponse) => {
			//console.log('Logged into Facebook!', res);
			//this.userProfile = JSON.stringify(res);
		//}).catch(e => {
			//console.log('Error logging into Facebook', e);
		//});

		//this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
	//}
}
