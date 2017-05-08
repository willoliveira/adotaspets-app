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
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
			
			firebase.initializeApp({
				apiKey: "AIzaSyAW5kS4jSmXOSzChodCEq9YpgIIBP5thrM",
				authDomain: "takecareofme-46558.firebaseapp.com",
				databaseURL: "https://takecareofme-46558.firebaseio.com",
				projectId: "takecareofme-46558",
				storageBucket: "takecareofme-46558.appspot.com",
				messagingSenderId: "941235909858"
			});
		});
	}
}

