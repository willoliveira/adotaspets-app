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
        saveInfos[`/users/${pet.userId}/pets/${pet.id}`] = { id: pet.id, name: pet.name };
		return firebase.database().ref().update(saveInfos);
	}

}
