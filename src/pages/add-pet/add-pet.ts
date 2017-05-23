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

	public pet: Pet = {
        userId: "",
        name: "",
        about: "",
        breed: "",
        kind: "",
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
        this.pet.userId = this.userInfo.id;
        var newPetKey = firebase.database().ref().child('pets').push().key;
        this.petsProvider.postNewPet(newPetKey, this.pet).then((response) => {
            console.log(response);
            console.log(response.val());
        });
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


    private onSuccessGetInfoStorage() {

    }

    private onError(msgError) {
		this.loader.dismiss();
        this.presentToast(msgError);
    }
}
