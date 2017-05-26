import { Injectable } from '@angular/core';
import { Pet } from '../../models/pet.model';

import firebase from 'firebase';

@Injectable()
export class PetsProvider {

	constructor() { }

	postNewPet(petId: string, pet: Pet) {
        var saveInfos = { };
        //salvando o pet
        saveInfos[`/pets/${petId}`] = pet;
        //salvando a referencia do pet no objeto do user
        saveInfos[`/users/${pet.userId}/pets/${petId}`] = { id: petId, name: pet.name };
		return firebase.database().ref().update(saveInfos);
	}

}
