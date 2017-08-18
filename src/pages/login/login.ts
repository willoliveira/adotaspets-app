import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';

@IonicPage()

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class Login {	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private authProvider: AuthenticateService,
		private userProvider: UserService,
		private fb: Facebook,
		private googlePlus: GooglePlus) { }

	public login(provider) {
		this.authProvider.login(provider)
			.then(res => this.onSuccessPostUser(res))
			.catch(err => console.log(err));
	}		

	private onSuccessPostUser(response) {		
		this.storage.set('userInfo', response[0]);
		this.goToHome();
	}

	public goToHome() {
		this.navCtrl.setRoot(Home);
	}
}
