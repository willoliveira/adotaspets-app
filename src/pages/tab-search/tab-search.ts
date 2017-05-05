import { Component } from '@angular/core';
import { App, NavController, NavParams } from 'ionic-angular';

import { Pet } from '../pet/pet';

@Component({
	selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})
export class TabSearch {

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public app: App) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabSearch');
	}

	public goToInfoPet() {
		this.app.getRootNav().push(Pet);
	}

}
