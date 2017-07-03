import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { ModalFilter } from '../modals/modal-filter/modal-filter';

@Component({
    selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})

export class TabSearch {
    public bgAvatarResp = "assets/img/lula.jpg";
	public zIndexFabs = 1;
	public waitRequest = true;
	public locked = false;
	private userInfo;
	private loader;
	public userPet;
    public anima = {
		likePet: false,
		cardPet: false,
		notlikePet: false,
		containerSearching: true
	};

	@ViewChild('currentCardPet') currentCardPet:ElementRef;

	constructor(
		public modalCtrl: ModalController,
		public toastCtrl: ToastController,
		public loadingCtrl: LoadingController,
		public storage: Storage,
		public userService: UserService,
        private geolocation: Geolocation,
		public app: App
    ) {}

    /**
     * Inicializa com o metodo de search dos pets
    */
	ngOnInit () {
		//this.initPage();
		this.getCurrentPet();
	}

    /**
     * ------------ PUBLIC ------------
    */

    /**
     * Abre modal de filtros do search
    */
	public openModalFilters() {
		let modal = this.modalCtrl.create(ModalFilter);

		modal.onDidDismiss(data => {
			console.log(data);
        });

        modal.present();
	}

    /**
     * ------------ PRIVATE ------------
    */

	/*initPage() {
		this.storage.get('userInfo')
			.then(this.onSuccessGetInfoStorage.bind(this))
			.catch(this.onError.bind(this, "Error get in storage"));
	}*/

    /**
     * Search de um pet por vez
    */
	private getCurrentPet () {
		this.zIndexFabs = 1;
		this.waitRequest = true;
		this.anima.likePet = this.anima.notlikePet = this.anima.cardPet = false;

        let data = {
            longitude: -48.990231,
            latitude: -22.452031,
            minDistance: 10,
            maxDistance: 100,
            filtersPet: { "size": "large", "ageYears": 2 }
        };

        this.userService
            .getPetByLocUser(data)
            .subscribe(
                res => {
                    this.zIndexFabs = 999;
                    this.waitRequest = this.anima.containerSearching = false;
                    this.anima.cardPet = true;

					this.userPet = res;
					this.userPet.distance = Math.round(parseInt(this.userPet.distance)/1000);
                },
                err => {
                    console.log(err);
                }
            );
	}

	private teste () {
		console.log("as");
	}

    /**
     * Evento de click para o like
    */
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

    /**
     * Evento de click para o 'nao gostei'
    */
	private notlikePet () {
		if (this.anima.containerSearching)
			return null;

		this.anima.containerSearching = this.anima.notlikePet = true;

		let elemCardPet = this.currentCardPet.nativeElement;
		elemCardPet.addEventListener("animationend", this.animationendCard.bind(this));
	}

    /**
     * Callback de fim para a animacao do card em css
     * @param event: Event
    */
	private animationendCard (event) {
		event.target.removeEventListener("animationend", this.animationendCard.bind(this));
		this.getCurrentPet();
	}

    /**
     * Toast geral
     * @param msg: String
    */
	private presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000
		});
		toast.present();
	}

    //showLoading() {
		//this.loader = this.loadingCtrl.create({ content: "Loading" });
		//this.loader.present();
	//}

    /**
     * ------------ EVENTS ------------
    */

	/*onSuccessGetInfoStorage(userInfo: User) {
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
	}*/
}
