import { Injectable } from '@angular/core';

import firebase from 'firebase';
import GeoFire from 'geofire';

import { Geoposition } from '@ionic-native/geolocation';

@Injectable()
export class UserProvider {

	/**
	 * Cria um novo usuario
	 * @param userId
	 * @param data
	 */
	postUser(userId, data) {
		return firebase.database().ref(`users/${userId}`).set(data);
	}

	/**
	 * Pega dos dados do usuario
	 * @param userId
	 */
	getUserOnce(userId) {
		return firebase.database().ref(`users/${userId}`).once('value');
	}


    setLocation(userId, position: Geoposition) {
        var firebaseRef = firebase.database().ref(`users/${userId}`);
        var geoFire = new GeoFire(firebaseRef);
        return geoFire.set("location", [position.coords.latitude, position.coords.longitude])
            .then(() => geoFire);
    }
}
