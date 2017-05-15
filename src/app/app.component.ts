import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { Login } from '../pages/login/login';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	rootPage:any = Login;
	
	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
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
			statusBar.styleDefault();
			splashScreen.hide();					
		});
	}
}

