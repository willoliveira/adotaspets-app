import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import firebase from 'firebase';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class Login {
	userProfile: any = null;

	constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Login');
	}

	public facebookLogin(){
		this.fb.login(['email']).then( (response) => {
			const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

			firebase.auth().signInWithCredential(facebookCredential).then((success) => {
				console.log("Firebase success: " + JSON.stringify(success));
				this.userProfile = success;
			})
			.catch((error) => {
				console.log("Firebase failure: " + JSON.stringify(error));
			});

		})
		.catch((error) => {
			console.log(error)
		});
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
