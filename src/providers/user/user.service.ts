import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class UserProvider {

	/**
	 * Cria um novo usuario
	 * @param userId
	 * @param data 
	 */
	postUser(userId, data) {
		return firebase.database().ref('users/' + userId).set(data);
	}

	/**
	 * Pega dos dados do usuario
	 * @param userId 
	 */
	getUserOnce(userId) {
		return firebase.database().ref('users/' + userId).once('value');
	}

	//TODO: Pensar se mando esses metodos para service de pet
	
	/**
	 * Inicializa todos os eventos
	 * @param userId 
	 */
	getPetToUserAllEvents(userId, callback) {
		getPetToUser(userId).on('child_added', callback.bind(this, "added"));
		getPetToUser(userId).on('child_removed', callback.bind(this, "removed"));
		getPetToUser(userId).on('child_changed', callback.bind(this, "changed"));
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
