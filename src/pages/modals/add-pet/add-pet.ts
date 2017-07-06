import { Component, ViewChildren, QueryList,  } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController, LoadingController, Slides, FabContainer } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { Pet } from '../../../models/pet.model';
import { PetService } from '../../../services/pet.service';

@Component({
	selector: 'add-pet',
	templateUrl: 'add-pet.html'
})

export class AddPet {
	public picturesPet: Array<any> = [];
	public picturesPetDeleted: Array<any> = [];
    public currentPhoto = 0;
	private editMode: Boolean = false;
	private userInfo;
	private loader;
	public pet: Pet = <Pet> {
		name: "",
		about: "",
		breed: "",
		kind: "",
		size: "",
		genre: "",
		ageYears: 0,
		ageMonths: 0,
		pictures: []
	};

    @ViewChildren('fabsPictures') fabsPictures: QueryList<FabContainer>;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private petService: PetService,
		private camera: Camera,
		private imagePicker: ImagePicker
    ) {}

	/**
     * Inicializa com o metodo get inicial
    */
	ngOnInit () {
		this.initPage(this.navParams.get("userInfo"), this.navParams.get("pet"));
	}

    /**
     * ------------ PUBLIC ------------
    */

	/*public postPets() {
		if (!this.loader)
            this.showLoading();

		if (this.pet._id) {
            var images: Array<any> = this.picturesPet.filter(picture => picture.status).concat(this.picturesPetDeleted);
            this.picturesPetDeleted = [];

		    if (images.length) {
                this.savePicturesRecursive(images, `Pet ${this.pet.name} atualizado com sucesso!`);
            }
            else {
                this.updatePet.call(this);
            }
		} else {
			this.postPet.call(this);
		}
    }*/

    public showConfirmDeletePet(pictureCount) {
		let confirm = this.alertCtrl.create({
			title: 'Tem certeza?',
			message: 'A foto do seu pet sera deletada para sempre.',
			buttons: [
				{ text: 'Cancelar', handler: () => { confirm.dismiss() } },
				{ text: 'Excluir', handler: this.deleteImage.bind(this, pictureCount) }
			]
		});
		confirm.present();
	}

	/**
	 * TODO: Impedir que mais de tres imagens sejam adicionadas
	 */
	public getPictureCamera(pictureIndex: number) {
        this.closeFabs();

		var options: CameraOptions = {
            quality: 80,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		};

		this.camera.getPicture(options)
			.then(this.onSuccessGetImage.bind(this))
            .catch(this.onError.bind(this, "Erro ao capturar imagem"))
	}

	//TODO: Fazer ainda...
    //Aqui vai usar o Transfer provavelmente
	public getPictureLibrary(pictureIndex: number) {
        // this.fabsPictures.toArray()[pictureIndex].close();
        this.closeFabs();

		var options: ImagePickerOptions = {
			maximumImagesCount: 1,
			quality: 50
		};
        //todo: ainda não fiz esse...
		this.imagePicker.getPictures(options)
			.then(this.onSuccessGetImage.bind(this))
            .catch((err) => {
				this.presentToast("Erro a capturar imagem");
				this.loader.dismiss();
			});
	}

    public closeFabs (index?: number) {
        var fabs = this.fabsPictures.toArray();
        fabs.forEach((fab, i) => {
            // if (typeof index !== undefined) {
            //     if (index !== i) { fab.close(); }
            // } else {
                fab.close();
            // }
        });
    }

    /**
     * ------------ PRIVATE ------------
    */

	private initPage(userInfo, pet) {
		//se não tiver, soltar um erro talvez
		if (userInfo) {
			this.userInfo = userInfo;
			if (pet) {
				this.pet = pet;
				this.editMode = true;
				// if (pet.hasOwnProperty("pictures")) {
				// 	this.picturesPet = Object.keys(pet.pictures)
                //         .sort((a, b) => {
                //             if (a.position > b.position) return 1;
                //             if (a.position < b.position) return -1;
                //             return 0;
                //         });
				// }
			}
		}
	}

    private onSuccessGetImage(data) {
        var imageData;

        (typeof data === 'object') ? imageData = data[0] : imageData = 'data:image/jpeg;base64,' + data;

        var objImage = {
            picture: imageData,
            position: this.currentPhoto
        };

        this.picturesPet.push(objImage);

        /*if (this.currentPhoto < this.picturesPet.length) {
            objImage["position"] =  this.currentPhoto;

            let petPicture = Object.keys(this.pet.pictures)
                .map(picture => this.pet.pictures[picture])
                .find(picture => picture.position === objImage["position"]);

            //depois fazer um merge melhor se pa
            objImage["id"] = petPicture.id;

            this.picturesPet[objImage["position"]] = objImage;
        } else {
            objImage["position"] = this.picturesPet.length;
            this.picturesPet.push(objImage);
        }*/
    }

    private deleteImage(index) {
        if (!this.picturesPet[index].local) {
            this.picturesPetDeleted.push(Object.assign(this.picturesPet[index], { status: "delete" }));
        }
        this.picturesPet.splice(index, 1);
        this.picturesPet.forEach((picture, index) => { picture.position = index });
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

    /**
     * TODO: Depois, voltar aqui e ver o que fazer se der erro... Talvez chamar a funcao para atualizar novamente
     * @param msgSuccess
    */
	private savePicturesRecursive(images, msgSuccess) {
		if (images.length) {
			var image = images.pop();
            if (image["status"] === "delete") {
                this.petService
                    .deleteImagePet(this.pet._id, image["id"])
                    .then(() => {
                        delete this.pet.pictures[image["id"]];
                        this.savePicturesRecursive(images, msgSuccess);
                    })
                    .catch(() => {
                        this.loader.dismiss();
                    });
            } else if (image["status"] === "update") {
                this.petService
                    .postImagePet(this.pet._id, image)
                    .then((snapshot: firebase.storage.UploadTaskSnapshot) => {
                        delete image.status;
                        if (!this.pet.hasOwnProperty("pictures")) {
                            this.pet.pictures = [];
                        }
                        this.pet.pictures[image.id] = Object.assign(image, { picture: snapshot.downloadURL });
                        this.savePicturesRecursive(images, msgSuccess);
                    })
                    .catch(() => {
                        this.loader.dismiss();
                    });
            }
		} else {
			//this.postPets();
		}
	}

	private postPet() {
		this.pet._userId = this.userInfo._id;
        this.pet.pictures = this.picturesPet;

		this.petService
			.postNewPet(this.pet)
			.subscribe(
                this.onSuccessPostPet.bind(this, `Pet ${this.pet.name} cadastrado com sucesso!`),
                this.onError.bind(this, "Erro ao cadastrar o pet!")
            );
	}

	private updatePet() {
		this.petService
			.updatePet(this.pet)
			.subscribe(
                this.onSuccessPostPet.bind(this, `Pet ${this.pet.name} atualizado com sucesso!`),
                this.onError.bind(this, "Erro ao cadastro um pet!")
            );
	}

    /**
     * ------------ EVENTS ------------
    */

	onSuccessPostPet(msgSuccess) {
		/*var images: Array<any> = this.picturesPet.filter(picture => picture.status).concat(this.picturesPetDeleted);
        this.picturesPetDeleted = [];

		if (images.length) {
            this.picturesPetDeleted = [];
			this.savePicturesRecursive(images, msgSuccess);
		} else {
			this.loader.dismiss();
			this.presentToast(msgSuccess);
            this.viewCtrl.dismiss(this.pet);
			// this.navCtrl.pop();
		}*/

        this.presentToast(msgSuccess);
	}

	onError(msgError) {
		//this.loader.dismiss();
		this.presentToast(msgError);
	}
}
