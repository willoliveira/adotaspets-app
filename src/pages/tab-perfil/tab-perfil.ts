import { Component } from '@angular/core';
import { App, ActionSheetController, AlertController, Platform, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../services/user.service';
import { PetService } from '../../services/pet.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AddPet } from '../modals/add-pet/add-pet';
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
	public pets: Array<Pet> = <Array<Pet>> [];
	private loader;
	private toaster;
    public userInfo: User = <User> {
        name: "",
        description: "",
        email: "",
        picture: "",
        loc: {
            type: "",
            coordinates: []
        }
    };

	constructor(
		public actionsheetCtrl: ActionSheetController,
		public platform: Platform,
		public app: App,
        public modalCtrl: ModalController,
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
		private userService: UserService,
		private petService: PetService,
		private storage: Storage,
		private sanitizer: DomSanitizer
    ) {}

    /**
     * Inicializa com o metodo get inicial
    */
	ngOnInit () {
		this.initPage();
	}

    /**
     * ------------ PUBLIC ------------
    */

    /**
     * Metodo de logout
    */
    public logout() {
        this.storage.remove('userInfo');
        this.locked = true;
        this.userInfo = <User> {};
    }

    /**
     * Login facebook
    */
    public facebookLogin() {
        this.app.getRootNav().push(Login);
    }

    /**
     * Login google
    */
    public googleLogin() {
    }

    /**
     * Abre menu de opcoes do pet
     * @param pet: Pet
    */
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

    /**
     * Retorna foto principal do pet
     * @param pet: Object
    */
    public imagePet(pet) {
        var picture = 'assets/img/avatar-ts-slinky.png';
        if (pet.pictures.length) {
            let petPictureFirst = Object.keys(pet.pictures).find(petPicture => pet.pictures[petPicture].position == '0');
            if (petPictureFirst) { picture = pet.pictures[petPictureFirst]["picture"]; }
        }
        return picture;
    }

    /**
     * Abre pagina de add pet
     * @param pet: Pet
    */
	public openAddPetPage(pet: Pet) {
        let addPetModal = this.modalCtrl.create(AddPet, {
            userInfo: this.userInfo,
			pet: pet
        });
        addPetModal.present();

        addPetModal.onDidDismiss(data => {
            if (data._id) {
                let petUpdate = this.pets.find(pet => pet._id === data._id)
                if (petUpdate) {
                    petUpdate = data;
                }
            } else {
                this.pets.push(data);
            }
        });

		// this.app.getRootNav().push(AddPet, {
        //     userInfo: this.userInfo,
		// 	pet: pet
        // });
	}

    /**
     * ------------ PRIVATE ------------
    */

    /**
     * Inicializa a pagina
    */
	private initPage () {
		this.storage.get('userInfo')
			.then(this.onSuccessGetInfoStorage.bind(this))
			.catch(this.onError.bind(this, "Error get in storage"));
	}

    /**
     * Show preloader
    */
	private showLoading () {
		this.loader = this.loadingCtrl.create({ content: "Loading" });
		this.loader.present();
	}

    /**
     * Show toast
     * @param msg: String
    */
	private presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000
		});
		toast.present();
	}

    /**
     * Render imagem
     * @param url: String
    */
	private safeStyleUrl (url) {
		return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
	}

    /**
     * Confirmacao de delete
     * @param pet: Object
    */
	private showConfirmDeletePet (pet) {
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

    /**
     * Metodo de delete do pet
     * @param pet: Object
    */
	private onDeletePet (pet) {
        this.showLoading();
		this.petService
            .deletePet(pet._id)
            .subscribe(response => {
                this.loader.dismiss();
                if (response.content) {
                    this.presentToast(`Pet ${pet.name} foi deletado com sucesso`);
                    var index = this.pets.findIndex(pet => pet._id === response.content._id);
                    if (index > -1) {
                        this.pets.splice(index, 1);
                    }
                }
            });
	}

    /**
     * ------------ EVENTS ------------
    */

    /**
     * Callback de sucesso get user storage
     * @param userInfo: User
    */
	onSuccessGetInfoStorage(userInfo: User) {
        this.showLoading();

        /*Para testes no desenvolvimento*/
        userInfo = {
            _id: "594189b1b669890b4c71f354",
            name: "Odassi",
            description: "description",
            email: "email",
            picture: "picture",
            loc: {
                type: "Point",
                coordinates: [-48.990231, -22.452031]
            }
        };

		if (userInfo) {
			this.userInfo = userInfo;
			this.userPicture = this.safeStyleUrl(userInfo.picture);
			this.locked = false;

            this.userService
                .getPetToUser(userInfo._id)
                .subscribe(
                    response => {
                        this.pets = response.content;
                        this.loader.dismiss();
                        this.waitRequest = false;
                        this.locked = true;
                    },
                    response => {
                        this.locked = true;
                        this.loader.dismiss();
                        let res = response.json();
                        if (res.message) {
                            this.presentToast(res.message);
                        }
                        else {
                            this.presentToast("Erro para recuperar os pets do usuário!");
                        }
                    });
		} else {
			// tava mandando pro Login, deixar lockado o perfil
			// this.app.getRootNav().push(Login);
            this.loader.dismiss();
			this.locked = true;
		}
	}

    /**
     * Callback de erro get user storage
     * @param msgError: String
    */
	onError(msgError) {
		this.waitRequest = false;
		this.loader.dismiss();
		this.presentToast(msgError);
	}
}
