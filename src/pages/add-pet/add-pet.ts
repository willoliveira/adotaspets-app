import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController, Slides } from 'ionic-angular';

import firebase from 'firebase';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

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
		genre: "",
		ageYears: 0,
		ageMonths: 0,
		pictures: { }
	};
	public picturesPet: Array<any> = [];
	public imageDefault = "assets/img/img-default-pet.jpg";

	private editMode: Boolean = false;
	private userInfo;
	private loader;	

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private petsProvider: PetsProvider,
		private camera: Camera,
		private imagePicker: ImagePicker) {

		this.initPage(this.navParams.get("userInfo"), this.navParams.get("pet"));
	}

	//------------------------
	//-------- PUBLIC---------
	//------------------------

	public postPets() {
		if (!this.loader) { this.showLoading(); }

		if (this.pet.id) {
			this.updatePet.call(this);
		} else {
			this.postPet.call(this);
		}
	}

    public showConfirmDeletePet(pet) {
		let confirm = this.alertCtrl.create({
			title: 'Tem certeza?',
			message: 'A foto do seu sera deletada para sempre.',
			buttons: [
				{ text: 'Cancelar', handler: () => { confirm.dismiss() } },
				{ text: 'Excluir', handler: this.deleteImage.bind(this, pet) }
			]
		});
		confirm.present();
	}

	/**
	 * TODO: Melhorar codigo no geral
	 * TODO: Impedir que mais de tres imagens sejam adicionadas
	 * TODO: Se não adicionar fotos na sequencia, vai dar erro perhaps, testar!
	 */
	public getPictureCamera() {
		var options: CameraOptions = {
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};

		this.camera.getPicture(options)
			.then(this.onSuccessGetImage.bind(this) )
            .catch(this.onError.bind(this, "Erro ao capturar imagem"))
	}

	//TODO: Fazer ainda...
	public getPictureLibrary() {
		var options: ImagePickerOptions = {
			maximumImagesCount: 1,
			quality: 50
		};

		this.imagePicker.getPictures(options)
			.then(this.onSuccessGetImage.bind(this))
            .catch((err) => {
				this.presentToast("Erro a capturar imagem");
				this.loader.dismiss();
			});
	}

	//------------------------
	// ------- PRIVATE -------
	//------------------------

	private initPage(userInfo, pet) {
		//se não tiver, soltar um erro talvez
		if (userInfo) {
			this.userInfo = userInfo;
			if (pet) {
				this.pet = pet;
				this.editMode = true;

				if (pet.hasOwnProperty("pictures")) {
					this.picturesPet = Object.keys(pet.pictures).map(picture => pet.pictures[picture]);
				}
			}
		}
	}

    private onSuccessGetImage(data) {
        var imageData;
        if (typeof data === 'object') {
            imageData = data[0];
        } else {
            imageData = 'data:image/jpeg;base64,' + data;
        }
        //depois explico isso aqui
        let position = 0;

        var objImage = {
            id: `__${position}`,
            position: position,
            picture: imageData
        };
        
        if (objImage.position < this.picturesPet.length) {
            this.picturesPet[objImage.position] = objImage;
        } else {
            this.picturesPet.push(objImage);
        }

        if (this.editMode) {
            this.showLoading();
            objImage.id = `${this.pet.id}${objImage.id}`;

            this.petsProvider
                .postImagePet(this.pet.id, objImage.id, objImage.picture)
                .then((snapshot: firebase.storage.UploadTaskSnapshot) => {

                    let petCache: Pet = Object.assign({}, this.pet);
                    if (!petCache.pictures) petCache.pictures = {};

                    //atualiza a foto com a que subiu no firebase
                    this.picturesPet[position].picture = snapshot.downloadURL;

                    petCache.pictures[objImage.id] = objImage;

                    this.petsProvider
                        .updatePet(petCache)
                        .then(() => { this.loader.dismiss(); })
                        .catch(() => {
                            //se da erro deleta
                            this.picturesPet.splice(position, 1);
                            delete petCache.pictures[objImage.id];

                            this.onError("Erro ao capturar imagem");
                        });
                });
        } else {
            this.picturesPet[position]["local"] = true;
        }
    }

    private deleteImage(index) {
        if (this.picturesPet[index].local) {
            this.picturesPet.splice(index, 1);
        } else {
            this.petsProvider
                .deleteImagePet(this.pet.id, this.picturesPet[index].id)
                .then(() => { this.picturesPet.splice(index, 1); })
                .catch(this.onError.bind(this, "Erro ao deletar imagem"));
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

	private savePicturesRecursive(msgSuccess) {
		var images: Array<any> = this.picturesPet.filter(picture => picture.local);
		if (images.length) {
			var image = images.pop();
			image.id =  `${this.pet.id}${image.id}`;
			this.petsProvider
				.postImagePet(this.pet.id, image.id, image.picture)
				.then((snapshot: firebase.storage.UploadTaskSnapshot) => {
					delete image.local;
					if (!this.pet.hasOwnProperty("pictures")) this.pet.pictures = { };
					this.pet.pictures[image.id] = Object.assign(image, { picture: snapshot.downloadURL });
					this.savePicturesRecursive(msgSuccess);
				}, () => {
					this.loader.dismiss();
				});
		} else {
			this.postPets();
			// TODO: Talvez usar esse por cuasa do toast de mensage, ouuu, setar a mensagem em uma variavel..
			// this.petsProvider
			// 	.updatePet(this.pet)
			// 	.then(this.onSuccessPostPet.bind(this, msgSuccess));
		}
	}

	private postPet() {
		this.pet.userId = this.userInfo.id;
		var newPetKey = firebase.database().ref().child('pets').push().key;

		this.pet.id = newPetKey;

		this.petsProvider
			.postNewPet(this.pet)
			.then(this.onSuccessPostPet.bind(this, "Pet cadastrado com sucesso!"))
			.catch(this.onError.bind(this, "Erro ao cadastro um pet!"));
	}

	private updatePet() {
		this.petsProvider
			.updatePet(this.pet)
			.then(this.onSuccessPostPet.bind(this, "Pet atualizado com sucesso!"))
			.catch(this.onError.bind(this, "Erro ao cadastro um pet!"));
	}


	//----------------------
	//------- EVENTS -------
	//----------------------

	private onSuccessPostPet(msgSuccess) {
		var images: Array<any> = this.picturesPet.filter(picture => picture.local);
		if (images.length) {
			this.savePicturesRecursive(msgSuccess);
		} else {
			this.loader.dismiss();
			this.presentToast(msgSuccess);

			this.navCtrl.pop();
		}
	}

	private onError(msgError) {
		this.loader.dismiss();
		this.presentToast(msgError);
	}

}
