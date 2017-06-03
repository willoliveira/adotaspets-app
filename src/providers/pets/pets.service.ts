import { Injectable } from '@angular/core';
import { Pet } from '../../models/pet.model';

import firebase from 'firebase';

@Injectable()
export class PetsProvider {

	constructor() { }

	postNewPet(pet: Pet) {
		var saveInfos = { };
		//salvando o pet
		saveInfos[`/pets/${pet.id}`] = pet;
		//salvando a referencia do pet no objeto do user
		//TODO: Melhorar essas definições talvez, do que salvar no objeto do user
		saveInfos[`/users/${pet.userId}/pets/${pet.id}`] = { id: pet.id };
		return firebase.database().ref().update(saveInfos);
	}

	updatePet(pet) {
		return firebase.database().ref(`/pets/${pet.id}`).update(pet);
	}

    //DELETAR TAMBEM AS IMAGENS
	deletePet(userId, petId) {
		var saveInfos = { };
		// deletando o pet
		saveInfos[`/pets/${petId}`] = null;
		// deletando o pet do usuario
		saveInfos[`/users/${userId}/pets/${petId}`] = null;
		return firebase.database().ref().update(saveInfos);
	}

	postImagePet(petId, imgId, data) {
        var imageRef = firebase.storage().ref().child(`images/pets/${petId}/${imgId}.jpg`);
        if (imgId.match("data:image/jpeg;base64")) {
		    return imageRef.putString(data, firebase.storage.StringFormat.DATA_URL);
        }
        return imageRef.put(data, { contentType: 'image/jpeg' });
	}

    deleteImagePet(petId, imgId) {
		return firebase.storage().ref()
            .child(`images/pets/${petId}/${imgId}.jpg`)
            .delete();
	}


	/**
	 * Inicializa todos os eventos relacionado a pets do usuario
	 * @param userId
	 */
	getPetToUserAllEvents(events, userId, callback) {
		var eventsSplit = events.split(' ');
		//depois fazer uma verificação se os eventos são aceitos por essa funcao, um enum serviria...
		eventsSplit.array.forEach(event => {
			getPetToUser(userId).on(event, callback.bind(this, event));
		});
	}

	/**
	 * Quando adiciona um pet
	 * @param userId
	 */
	getPetToUserAdded(userId, callback) {
		getPetToUser(userId).on('child_added', callback);
	}

	/**
	 * Quando remove um pet
	 * @param userId
	 */
	getPetToUserRemoved(userId, callback) {
		getPetToUser(userId).on('child_removed', callback);
	}

	/**
	 * Quando altera alguma informação de algum nó dos pets
	 * @param userId
	 */
	getPetToUserChanged(userId, callback) {
		getPetToUser(userId).on('child_changed', callback);
	}

	/**
	 * Pega dos dados dos pets do user
	 * @param userId
	 */
	getPetToUserOnce(userId) {
		return getPetToUser(userId).once("value");
	}
}

/**
 * Fica ouvindo alteração nos objetos dos pets do usuario
 * Usar com os eventos: child_changed, child_added e child_removed
 * ex: .on('child_removed', handler)
 * @param userId id do usuario dono do pet
 */
function getPetToUser(userId) {
	return firebase.database().ref(`pets/`).orderByChild("userId").equalTo(userId);
}
