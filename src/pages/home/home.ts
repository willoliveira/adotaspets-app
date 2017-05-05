import { Camera, CameraOptions } from '@ionic-native/camera';

import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';

import firebase from 'firebase';

import { TabMessages } from '../tab-messages/tab-messages';
import { TabPerfil } from '../tab-perfil/tab-perfil';
import { TabSearch } from '../tab-search/tab-search';

import { Pet } from '../pet/pet';

@IonicPage()
@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class Home {

	captureDataUrl: string;

	tabPefil;
	tabMessages;
	tabSearch;

	constructor(
		public navCtrl: NavController,
		public camera: Camera) {
		
		this.tabMessages = TabMessages;
		this.tabPefil = TabPerfil;
		this.tabSearch = TabSearch;
	}

	
	//Test Firebase Storage
	capture() {
		var cameraOptions: CameraOptions = {
			quality: 50,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
		};
		
		this.camera.getPicture(cameraOptions).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64:
			this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
		}, (err) => {
			// Handle error
		});
	}

	upload() {
		var storageRef = firebase.storage().ref();
		// Create a timestamp as filename
		var filename = Math.floor(Date.now() / 1000);

		// Create a reference to 'images/todays-date.jpg'
		var imageRef = storageRef.child(`images/${filename}.jpg`);

		imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
			console.log(snapshot);
		});

	}
	
}
