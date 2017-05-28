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

    deletePet(userId, petId) {
        var saveInfos = { };
        // deletando o pet
        saveInfos[`/pets/${petId}`] = null;
        // deletando o pet do usuario
        saveInfos[`/users/${userId}/pets/${petId}`] = null;
        return firebase.database().ref().update(saveInfos);
    }
}
