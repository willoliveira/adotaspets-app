import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Pet } from '../../models/pet.model';

import Config from '../../utils/Config.ts';

import firebase from 'firebase';

@Injectable()
export class PetsProvider {

    constructor(public http: Http) { }

	postNewPet(pet: Pet) {
		// var saveInfos = { };
		// //salvando o pet
		// saveInfos[`/pets/${pet.id}`] = pet;
		// //salvando a referencia do pet no objeto do user
		// //TODO: Melhorar essas definições talvez, do que salvar no objeto do user
		// saveInfos[`/users/${pet.userId}/pets/${pet.id}`] = { id: pet.id };
		// return firebase.database().ref().update(saveInfos);
        return this.http
            .post(`${Config.api_url}/v1/pet`, pet)
            .map((response: Response) => response.json());
	}

	updatePet(pet: Pet) {
		// return firebase.database().ref(`/pets/${pet.id}`).update(pet);
        return this.http
            .put(`${Config.api_url}/v1/pet/${pet._id}`, pet)
            .map((response: Response) => response.json());
	}

    //DELETAR TAMBEM AS IMAGENS
	deletePet(petId) {
		// var saveInfos = { };
		// // deletando o pet
		// saveInfos[`/pets/${petId}`] = null;
		// // deletando o pet do usuario
		// saveInfos[`/users/${userId}/pets/${petId}`] = null;
		// return firebase.database().ref().update(saveInfos);
        return this.http
            .delete(`${Config.api_url}/v1/pet/${petId}`)
            .map((response: Response) => response.json());
	}

	postImagePet(petId, imageObject) {
        var imageRef = firebase.storage().ref().child(`images/pets/${petId}/${imageObject.id}.jpg`);
        if (imageObject.picture.match("data:image/jpeg;base64")) {
		    return imageRef.putString(imageObject.picture, firebase.storage.StringFormat.DATA_URL);
        }
        //TODO: esse aqui ainda não funciona
        return imageRef.put(imageObject.picture, { contentType: 'image/jpeg' });
	}

    deleteImagePet(petId, imgId) {
		return firebase.storage().ref()
            .child(`images/pets/${petId}/${imgId}.jpg`)
            .delete();
	}
}
