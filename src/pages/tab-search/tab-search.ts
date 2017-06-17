import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, ModalController, ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

import { User } from '../../models/user.model';
import { UserProvider } from '../../providers/user/user.service';

import { ModalFilter } from '../modals/modal-filter/modal-filter';

@Component({
	selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})
export class TabSearch {
	public bgAvatarResp: String = "assets/img/lula.jpg";
	public zIndexFabs: Number = 1;
	public waitRequest: Boolean = true;
	public locked: Boolean = false;

	public anima = {
		likePet: false,
		cardPet: false,
		notlikePet: false,
		containerSearching: true
	};

	private userInfo;
	private loader;

	@ViewChild('currentCardPet') currentCardPet:ElementRef;

	constructor(
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public storage: Storage,
		public userProvider: UserProvider,
        private geolocation: Geolocation,
		public app: App) { }

	ngOnInit () {
		this.initPage();

		this.getCurrentPet();
	}


	//----------------------
	// ------ PUBLIC -------
	//----------------------

	openModalFilters() {
		let modal = this.modalCtrl.create(ModalFilter);
		modal.present();
	}


	//------------------------
	// ------- PRIVATE -------
	//------------------------

	private initPage() {
		this.storage.get('userInfo')
			.then(this.onSuccessGetInfoStorage.bind(this))
			.catch(this.onError.bind(this, "Error get in storage"));
	}

	private getCurrentPet () {
		this.zIndexFabs = 1;
		this.waitRequest = true;
		this.anima.likePet = this.anima.notlikePet = this.anima.cardPet = false;

		setTimeout(function () {
			this.zIndexFabs = 999;
			this.waitRequest = this.anima.containerSearching = false;
			this.anima.cardPet = true;
		}.bind(this), 3000);
	}


	private likePet () {
		if (this.anima.containerSearching)
			return null;

		this.anima.containerSearching = this.anima.likePet = true;

		let elemCardPet = this.currentCardPet.nativeElement;
		elemCardPet.addEventListener("animationend", this.animationendCard.bind(this));

		let toast = this.toastCtrl.create({
			message: 'Uma nova conversa com o responsável foi criada na aba de mensagens.',
			duration: 5000,
		});

		toast.present();
	}

	private notlikePet () {
		if (this.anima.containerSearching)
			return null;

		this.anima.containerSearching = this.anima.notlikePet = true;

		let elemCardPet = this.currentCardPet.nativeElement;
		elemCardPet.addEventListener("animationend", this.animationendCard.bind(this));
	}

	private animationendCard (event) {
		event.target.removeEventListener("animationend", this.animationendCard.bind(this));
		this.getCurrentPet();
	}


	private showLoading() {
		this.loader = this.loadingCtrl.create({ content: "Loading" });
		this.loader.present();
	}

	private presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000
		});
		toast.present();
	}


	//----------------------
	//------- EVENTS -------
	//----------------------

	onSuccessGetInfoStorage(userInfo: User) {
		this.loader && this.loader.dismiss();
		this.waitRequest = false;
		if (userInfo) {
			this.userInfo = userInfo;
			this.locked = false;
		} else {
			// tava mandando pro Login, deixar lockado o perfil
			// this.app.getRootNav().push(Login);
			this.locked = true;
		}
	}

	onError(msgError) {
		this.waitRequest = false;
		this.loader.dismiss();

		this.presentToast(msgError);
	}
}
