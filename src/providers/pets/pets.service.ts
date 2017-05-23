import { Injectable } from '@angular/core';

import firebase from 'firebase';

@Injectable()
export class PetsProvider {

	constructor() { }

	postNewPet(petId, pet) {
        var saveInfos = { };
        saveInfos["/pets/" + petId] = pet;
        saveInfos["/users/pets/" + petId] = { id: petId, name: pet.name };
		return firebase.database().ref().update(saveInfos);
	}

}
