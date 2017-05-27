import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';

import firebase from 'firebase';

import { Pet } from '../../models/pet.model';
import { PetsProvider } from '../../providers/pets/pets.service';

@Component({
	selector: 'add-pet',
	templateUrl: 'add-pet.html'
})

export class AddPet {

	public pet: Pet = <Pet> {
		userId: "",
		name: "",
		about: "",
		breed: "",
		kind: "",
		size: "",
		pictures: {}
	};

	private userInfo;
	private loader;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private petsProvider: PetsProvider) {

		this.initPage(this.navParams.get("userInfo"));
	}

	//------------------------
	//-------- PUBLIC---------
	//------------------------

	public postPets() {
        this.showLoading();

		this.pet.userId = this.userInfo.id;
		var newPetKey = firebase.database().ref().child('pets').push().key;

		this.pet.id = newPetKey;

        this.petsProvider
            .postNewPet(this.pet)
            .then(this.onSuccessPostPet.bind(this))
            .catch(this.onError.bind(this, "Erro ao cadastro um pet!"));
	}

	//------------------------
	// ------- PRIVATE -------
	//------------------------

	private initPage(userInfo) {
		if (userInfo) {
			this.userInfo = userInfo;
		}
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

	private onError(msgError) {
		this.loader.dismiss();
		this.presentToast(msgError);
	}

    //----------------------
	//------- EVENTS -------
	//----------------------

    private onSuccessPostPet() {
        this.loader.dismiss();
        this.presentToast("Pet cadastrado com sucesso!");

        this.navCtrl.pop();
    }
}
