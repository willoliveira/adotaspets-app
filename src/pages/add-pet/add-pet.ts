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
		name: "",
		about: "",
		breed: "",
		kind: "",
		size: "",
		pictures: {}
	};
	private editMode: Boolean = false;
	private userInfo;
	private loader;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private petsProvider: PetsProvider) {

		this.initPage(this.navParams.get("userInfo"), this.navParams.get("pet"));
	}

	//------------------------
	//-------- PUBLIC---------
	//------------------------

	public postPets() {
        this.showLoading();
		if (this.pet.id) {
			this.petsProvider
				.updatePet(this.pet)
				.then(this.onSuccessPostPet.bind(this, "Pet atualizado com sucesso!"))
				.catch(this.onError.bind(this, "Erro ao cadastro um pet!"));
		} else {
			this.pet.userId = this.userInfo.id;
			var newPetKey = firebase.database().ref().child('pets').push().key;

			this.pet.id = newPetKey;

			this.petsProvider
				.postNewPet(this.pet)
				.then(this.onSuccessPostPet.bind(this, "Pet cadastrado com sucesso!"))
				.catch(this.onError.bind(this, "Erro ao cadastro um pet!"));
		}
	}

	//------------------------
	// ------- PRIVATE -------
	//------------------------

	private initPage(userInfo, pet) {
		//se não tiver, soltar um erro talvez
		if (userInfo) {
			this.userInfo = userInfo;
			if (this.pet) {
				this.pet = pet;
				this.editMode = true;
			}
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

    private onSuccessPostPet(msgSuccess) {
        this.loader.dismiss();
        this.presentToast(msgSuccess);

        this.navCtrl.pop();
    }
}
