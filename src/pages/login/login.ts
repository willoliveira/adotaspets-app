import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
		private storage: Storage,
		private authProvider: AuthenticateProvider,
		private userProvider: UserProvider) { }

	public facebookLogin() {

		this.authProvider.loginFace(['email']).then((response) => {
			this.authProvider.authFace(response.authResponse.accessToken)
				.then(this.authFaceSuccess.bind(this))
				.catch((error) => {
					console.log("Firebase failure: " + JSON.stringify(error));
				});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	private authFaceSuccess(response) {
		//Verifica se já existe usuário na base, se não cadastra
		this.userProvider
			.getUserOnce(response.uid)
			.then((responseGetUserOnce) => {
				var val = responseGetUserOnce.val();
				if (val) {
					this.storage.set("userInfo", val);
					this.goToHome();
				} else {
					let userInfo = {
						id: response.uid,
						email: response.email,
						description: "",
						name: response.displayName,
						picture: response.photoURL,
						pets: ""
					};
					this.userProvider
						.postUser(response.uid, userInfo)
						.then(this.onSuccessPostUser.bind(this, userInfo));
				}
			});
	}

	private onSuccessPostUser(userInfo) {
		this.storage.set('userInfo', userInfo);
		this.goToHome();
	}

	public goToHome() {
		this.navCtrl.setRoot(Home);
	}
}
