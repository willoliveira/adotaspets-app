import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user.service';

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
		private userProvider: UserProvider,
		private storage: Storage,
		private sanitizer: DomSanitizer
		) {
			this.initPage();
		}

	//------------------------
	//-------- PUBLIC---------
	//------------------------

	public openMenu() {
		let actionSheet = this.actionsheetCtrl.create({
			title: 'Ações',
			cssClass: 'action-sheets-basic-page',
			buttons: [
				{
				text: 'Editar',
				role: 'editar',
				icon: !this.platform.is('ios') ? 'create' : null,
				handler: () => {
					console.log('Delete clicked');
				}
				},
				{
				text: 'Alterar status',
				role: 'status',
				icon: !this.platform.is('ios') ? 'home' : null,
				handler: () => {
					console.log('Share clicked');
				}
				},
				{
				text: 'Excluir',
				role: 'excluir', // will always sort to be on the bottom
				icon: !this.platform.is('ios') ? 'trash' : null,
				handler: () => {
					console.log('Cancel clicked');
				}
				},
				{
				text: 'Cancelar',
				role: 'cancelar', // will always sort to be on the bottom
				icon: !this.platform.is('ios') ? 'close' : null,
				handler: () => {
					console.log('Cancel clicked');
				}
				}
			]
		});
		actionSheet.present();
	}

	public openAddPetPage() {
		this.app.getRootNav().push(AddPet, {
            userInfo: this.userInfo
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
	
	private managePetsObject(event: string, data: firebase.database.DataSnapshot) {		
		var index = this.pets.findIndex((element) => element.id === data.key);
		switch (event) {
			case "added":
				if (index === -1) {
					this.pets.push(data.val());
				}
				break;
			case "removed": 
				if (index > -1) {
					this.pets.splice(index, 1);
				}
				break;
			case "changed": 
				if (index > -1) {
					this.pets[index] = Object.assign(this.pets[index], data.val());
				}
				break;
		}
	}

	//----------------------
	//------- EVENTS -------
	//----------------------

	onSuccessGetInfoStorage(userInfo: User) {
		this.loader.dismiss();
		this.waitRequest = false;
		if (userInfo) {
			this.userInfo = userInfo;
			this.userPicture = this.safeStyleUrl(userInfo.picture);
			this.locked = false;

            //Inicializa os eventos referente aos pet do usuario
			//TODO: Testar esse depois
			// this.userProvider
			// 	.getPetToUserAllEvents.call(this, this.userInfo.id)
			// 	.then(this.managePetsObject.bind(this, "added"));

			//TODO: Talvez fazer um esquema que dentro do provider ele assine todos os eventos de uma vez só
            this.userProvider
				.getPetToUserAdded(this.userInfo.id)
				.then(this.managePetsObject.bind(this, "added"));

            this.userProvider
				.getPetToUserRemoved(this.userInfo.id)
				.then(this.managePetsObject.bind(this, "removed"));

            this.userProvider
				.getPetToUserChanged(this.userInfo.id)
				.then(this.managePetsObject.bind(this, "changed"));

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
