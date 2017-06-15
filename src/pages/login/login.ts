import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { Storage } from '@ionic/storage';

import { AuthenticateProvider } from '../../providers/authenticate/authenticate.service';
import { UserProvider } from '../../providers/user/user.service';


declare var cordova;

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
		private userProvider: UserProvider,
        private fb: Facebook) { }

	public facebookLogin() {

        this.fb.login(['public_profile', 'email']).then((response) => {
            let params = new Array<string>();
            this.fb.api("me?fields=name,gender,email", params)
                .then(this.authFaceSuccess.bind(this))
				.catch((error) => {
					console.log("failure: " + JSON.stringify(error));
				});
		})
		.catch((error) => {
			console.log(error);
		});
	}

	private authFaceSuccess(userFace) {
        console.log(userFace)
		//Verifica se já existe usuário na base, se não cadastra
		this.userProvider
			.getUserByEmail(userFace.email)
			.subscribe((responseUser) => {
                console.log(responseUser);
				if (responseUser.content) {
                    this.onSuccessPostUser(responseUser.content);
				} else {
					let userInfo = {
						email: userFace.email,
						description: "",
						name: userFace.name,
						picture: "https://graph.facebook.com/" + userFace.id + "/picture?type=large",
						pets: []
					};
					this.userProvider
						.postUser(userInfo)
						.subscribe(this.onSuccessPostUser.bind(this));
				}
			}, () => {
                console.log("Error");
            });
	}

	private onSuccessPostUser(response) {
		this.storage.set('userInfo', response[0]);
		this.goToHome();
	}

	public goToHome() {
		this.navCtrl.setRoot(Home);
	}
}
