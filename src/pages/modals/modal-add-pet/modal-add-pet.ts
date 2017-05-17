import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

@Component({
	selector: 'modal-add-pet',
	templateUrl: 'modal-add-pet.html'
})

export class ModalAddPet {
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
