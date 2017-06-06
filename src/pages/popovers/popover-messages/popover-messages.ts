import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

@Component({
	selector: 'popover-messages',
	templateUrl: 'popover-messages.html'
})

export class PopoverMessages {
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}

	goTo(strNav) {
		this.viewCtrl.dismiss();
	}
}
