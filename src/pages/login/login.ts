import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { Storage } from '@ionic/storage';

import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';


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
		private authProvider: AuthenticateService,
		private userProvider: UserService,
		private fb: Facebook,
		private googlePlus: GooglePlus) { }

	public facebookLogin() {
		this.fb.login(['public_profile', 'user_friends', 'email'])
			.then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
			.catch(e => console.log('Error logging into Facebook', e));

        /*this.fb.login(['public_profile', 'email']).then((response) => {
            let params = new Array<string>();
            this.fb.api("me?fields=name,gender,email", params)
                .then(this.authFaceSuccess.bind(this))
				.catch((error) => {
					console.log("failure: " + JSON.stringify(error));
				});
		})
		.catch((error) => {
			console.log(error);
		});*/
	}

	public googleLogin() {
		//this.googlePlus.login({'webClientId': '349595714070-fgdvau5okrej0e66t7udtcnrpjv199ai.apps.googleusercontent.com', 'offline': true})
		this.googlePlus.login({})
			.then( res => console.log(res))
			.catch(err => console.error(err));
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
        /*Para testes no desenvolvimento*/
        var userInfo = {
            // _id: "594029a1261c1c28cccaa161",
            _id: "5942da98444a293d906fd736",
            name: "Odassi",
            description: "description",
            email: "email",
            picture: "picture",
            loc: {
                type: "Point",
                coordinates: [-48.990231, -22.452031]
            }
        };
        this.storage.set('userInfo', userInfo);
		this.navCtrl.setRoot(Home);
	}
}
