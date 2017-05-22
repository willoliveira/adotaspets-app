import { Component } from '@angular/core';
import { App, ModalController, NavController, NavParams } from 'ionic-angular';

import { Pet } from '../pet/pet';
import { ModalFilter } from '../modals/modal-filter/modal-filter';

@Component({
	selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})

export class TabSearch {

	constructor(
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public app: App) {
	}

	openModal() {
		let modal = this.modalCtrl.create(ModalFilter);
		modal.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabSearch');
	}

	public goToInfoPet() {
		this.app.getRootNav().push(Pet);
	}

}
