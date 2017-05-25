import { Component } from '@angular/core';
import { App, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { Pet } from '../pet/pet';
import { ModalFilter } from '../modals/modal-filter/modal-filter';

@Component({
	selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})

export class TabSearch {
    public currentPet: Object[] = [];
    public waitRequest: Boolean = true;
    public zIndex1: Boolean = true;

	constructor(
		public modalCtrl: ModalController,
		public navCtrl: NavController,
		public navParams: NavParams,
        public toastCtrl: ToastController,
		public app: App) {

            this.getCurrentPet();
	}

    getCurrentPet () {
        /*simula uma requisicao para mostrar tela de searching*/
        setTimeout(function () {
            this.zIndex1 = false;
            this.waitRequest = false;
        }.bind(this), 3000);
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
            duration: 7000,
        });
        toast.present();

        this.afterAnimation();
    }

    notlikePet () {
        document.getElementById("current-card-pet").classList.add("anima-notlikePet");
        this.afterAnimation();
    }

    afterAnimation (durationAnimation = 300) {
        setTimeout(function () {
            this.zIndex1 = true;
            this.waitRequest = true;
        }.bind(this), durationAnimation);
    }
}
