import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ActionSheetController, AlertController, Platform, ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user.service';
import { PetsProvider } from '../../providers/pets/pets.service';

import { DomSanitizer } from '@angular/platform-browser';

import { AddPet } from '../add-pet/add-pet';
import { Login } from '../login/login';

import { User } from '../../models/user.model';
import { Pet } from '../../models/pet.model';

@Component({
	selector: 'page-tab-perfil',
	templateUrl: 'tab-perfil.html',
})

export class TabPerfil {
	public tab = "perfil";
	public locked: Boolean = true;
	public waitRequest: Boolean = true;
	public userPicture;
	public userInfo:User = <User> {
        name: "", description: ""
    };

	public pets: Array<Pet> = <Array<Pet>> [];

	private loader;
	private toaster;

	constructor(
		public actionsheetCtrl: ActionSheetController,
		public platform: Platform,
		public app: App,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private userProvider: UserProvider,
		private petsProvider: PetsProvider,
		private storage: Storage,
		private sanitizer: DomSanitizer
		) {
			this.initPage();
		}

	//------------------------
	//-------- PUBLIC---------
	//------------------------

    public logout() {
        this.storage.remove('userInfo');
        this.locked = true;
        this.userInfo = <User> {};
    }

    public facebookLogin() {
        this.app.getRootNav().push(Login);
    }

    public googleLogin() {

    }

	public openMenu(pet: Pet) {
		let actionSheet = this.actionsheetCtrl.create({
			title: 'Ações',
			cssClass: 'action-sheets-basic-page',
			buttons: [
				{
					text: 'Editar',
					role: 'editar',
					icon: !this.platform.is('ios') ? 'create' : null,
					handler: this.openAddPetPage.bind(this, pet)
				},
				{
					text: 'Alterar status',
					role: 'status',
					icon: !this.platform.is('ios') ? 'home' : null,
					handler: () => { console.log('Share clicked'); }
				},
				{
					text: 'Excluir',
					role: 'excluir',
					icon: !this.platform.is('ios') ? 'trash' : null,
					handler: this.showConfirmDeletePet.bind(this, pet)
				},
				{
					text: 'Cancelar',
					role: 'cancelar',
					icon: !this.platform.is('ios') ? 'close' : null,
					handler: () => { actionSheet.dismiss() }
				}
			]
		});
		actionSheet.present();
	}

    public imagePet(pet) {
        var picture = 'assets/img/avatar-ts-slinky.png';
        if (pet.pictures.length) {
            let petPictureFirst = Object.keys(pet.pictures).find(petPicture => pet.pictures[petPicture].position == '0');
            if (petPictureFirst) { picture = pet.pictures[petPictureFirst]["picture"]; }
        }
        return picture;
    }

	public openAddPetPage(pet: Pet) {
		this.app.getRootNav().push(AddPet, {
            userInfo: this.userInfo,
			pet: pet
        });
	}

	//------------------------
	// ------- PRIVATE -------
	//------------------------

	private initPage() {
		this.showLoading();
		this.storage.get('userInfo')
			.then(this.onSuccessGetInfoStorage.bind(this))
			.catch(this.onError.bind(this, "Error get in storage"));
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

	private safeStyleUrl(url) {
		return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
	}

	private showConfirmDeletePet(pet) {
		let confirm = this.alertCtrl.create({
			title: 'Tem certeza?',
			message: 'Seu pet será excluido permanentemente.',
			buttons: [
				{ text: 'Cancelar', handler: () => { confirm.dismiss() } },
				{ text: 'Excluir', handler: this.onDeletePet.bind(this, pet) }
			]
		});
		confirm.present();
	}

	private onDeletePet(pet) {
        this.showLoading();
		this.petsProvider
            .deletePet(pet._id)
            .subscribe(response => {
                this.loader.dismiss();
                if (response.content) {
                    this.presentToast(`Pet ${response.content._id} foi deletado com sucesso`);
                    var index = this.pets.findIndex((pet) => pet._id === response.content._id);
                    if (index > -1) {
                        this.pets.splice(index, 1);
                    }
                }
            });
	}

	//----------------------
	//------- EVENTS -------
	//----------------------

	onSuccessGetInfoStorage(userInfo: User) {
		if (userInfo) {
            console.log(userInfo)
			this.userInfo = userInfo;
			this.userPicture = this.safeStyleUrl(userInfo.picture);
			this.locked = false;

            this.userProvider
                .getPetToUser(userInfo._id)
                .subscribe(response => {
                    this.pets = response.content;
                    this.loader.dismiss();
                    this.waitRequest = false;
                });
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
