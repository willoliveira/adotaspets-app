import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import firebase from 'firebase';

import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any;
	
	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private storage: Storage) {
		const firebaseConfig = {
			apiKey: "AIzaSyAZ5V-6_ql43SrlOa-qKlAnXBsqQrHL9h0",
			authDomain: "adotapets-7c2fa.firebaseapp.com",
			databaseURL: "https://adotapets-7c2fa.firebaseio.com",
			projectId: "adotapets-7c2fa",
			storageBucket: "adotapets-7c2fa.appspot.com",
			messagingSenderId: "865809069618"
		};
		firebase.initializeApp(firebaseConfig);
		
		platform.ready().then(() => {
			// this.initApp();
			// this.rootPage = Login;
			this.storage.get("uid")
				.then(() => { 
					this.rootPage = Home;
					this.initApp();
				}).catch(() => {
					this.rootPage = Login;
					this.initApp()
				});
		});
	}

	private initApp() {
		this.statusBar.styleDefault();
		this.splashScreen.hide();
	}
}

