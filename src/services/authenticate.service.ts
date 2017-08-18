import Config from '../utils/Config.ts';
import { Injectable } from '@angular/core';

import { UserService } from './user.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()

export class AuthenticateService {
	private provider;

	constructor(
		private fb: Facebook,	
		private userProvider: UserService,	
		private googlePlus: GooglePlus) { }

	login(provider) {
		this.provider = provider;				

		if (this.provider === 'facebook') {
			return this.fb.login(['public_profile', 'user_friends', 'email'])
				.then((res: FacebookLoginResponse) => this.getInfoUserFace(res))
				.catch(err => 'Error logging into Facebook: ' + err);
		}
		else if (this.provider === 'googleplus') {
			return this.googlePlus.login({'webClientId': '865809069618-a2m86lpc48f5b336b86csp5508khrghh.apps.googleusercontent.com', 'offline': true})		
				.then(res => this.authSuccess(res))
				.catch(err => 'Error logging into Google: ' + err);
		}
	}	

	getInfoUserFace(res) {		
		return this.fb.api("/me?fields=email,name&access_token=" + res.authResponse.accessToken, null)
			.then(res => this.authSuccess(res))
			.catch(err => 'Error logging into Facebook: ' + err);							
	}

	authSuccess(user) {		
		return new Promise((resolve, reject) => {
			this.userProvider
				.getUserByEmail(user.email)
				.subscribe(
					res => {                    
						if (res.content)
							resolve(res.content);
						else {							
							this.userProvider
								.postUser(this.getParamPostUser(user))
								.subscribe(
									res => resolve(new Array(res.content)),
									err => reject(err)
								);
						}
					},
					err => reject(err)
				);			
		});		
	}

	getParamPostUser(user) {
		let objUser = {};

		switch (this.provider) {
			case 'facebook':							
				objUser['name'] = user.name;
				objUser['picture'] = "https://graph.facebook.com/" + user.id + "/picture?type=large";
			
				break;
		
			case 'googleplus':				
				objUser['name'] = user.displayName;
				objUser['picture'] = user.imageUrl;

				break;
		}		

		let objCommon = {
			email: user.email,
			description: '',
			loc: '{}'
		}

		return Object.assign({}, objUser, objCommon);
	}
}
