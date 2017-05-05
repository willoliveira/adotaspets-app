import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-tab-perfil',
	templateUrl: 'tab-perfil.html',
})
export class TabPerfil {
	
	public tab = "perfil";
	
	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad TabPerfil');
	}
	
}
