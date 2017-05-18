import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

@Component({
	selector: 'add-pet',
	templateUrl: 'add-pet.html'
})

export class AddPet {
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}
}
