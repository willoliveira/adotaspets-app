import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Responsible } from '../responsible/responsible';

@IonicPage()
@Component({
	selector: 'page-pet',
	templateUrl: 'pet.html',
})
export class Pet {

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Pet');
	}


	public goToResponsible() {
		this.navCtrl.push(Responsible);
	}

}
