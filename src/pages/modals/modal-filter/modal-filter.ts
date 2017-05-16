import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

@Component({
	selector: 'modal-filter',
	templateUrl: 'modal-filter.html'
})

export class ModalFilter {
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
