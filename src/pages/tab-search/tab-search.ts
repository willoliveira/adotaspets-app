import { Component, ElementRef, ViewChild } from '@angular/core';
import { App, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { Pet } from '../pet/pet';
import { ModalFilter } from '../modals/modal-filter/modal-filter';

@Component({
	selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})

export class TabSearch {
    @ViewChild('myElement') myElement: ElementRef;


	constructor(
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public navParams: NavParams,
        public toastCtrl: ToastController,
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

    likePet () {
        document.getElementById("current-card-pet").classList.add("anima-likePet");

        let toast = this.toastCtrl.create({
            message: 'Uma nova conversa com o responsável foi criada na aba de mensagens.',
            duration: 10000,
        });

        toast.present();
    }

    notlikePet () {
        document.getElementById("current-card-pet").classList.add("anima-notlikePet");
    }
}
