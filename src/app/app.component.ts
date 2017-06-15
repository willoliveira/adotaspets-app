import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';

import firebase from 'firebase';

import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';

@Component({
	templateUrl: 'app.html'
})
export class AdotaPets {
	rootPage:any;

	constructor(
		private platform: Platform,
		private statusBar: StatusBar,
		private splashScreen: SplashScreen,
		private storage: Storage,
        private backgroundMode: BackgroundMode) {

        this.backgroundMode.enable();

		platform.ready().then(() => {
			this.storage.get("userInfo")
				.then(this.initApp.bind(this))
				.catch(this.initApp.bind(this));
		});
	}

	private initApp(userInfo) {
		if (userInfo) {
			this.rootPage = Home;
		}
		else {
			this.rootPage = Login;
		}

		this.statusBar.backgroundColorByHexString("#155818");

		setTimeout(() => {
			this.splashScreen.hide();
		}, 100);
	}
}

