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
			apiKey: "AIzaSyCmtCwSwRTeOSSNPYGNuu9s2ZjiYfS71UE",
			authDomain: "adotapets-11b45.firebaseapp.com",
			databaseURL: "https://adotapets-11b45.firebaseio.com",
			projectId: "adotapets-11b45",
			storageBucket: "adotapets-11b45.appspot.com",
			messagingSenderId: "349595714070"
		};

		firebase.initializeApp(firebaseConfig);
		
		platform.ready().then(() => {			
			statusBar.styleDefault();
			splashScreen.hide();					
		});
	}
}

