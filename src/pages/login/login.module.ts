import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';

import { AuthenticateProvider } from '../../providers/authenticate/authenticate.service';
import { UserProvider } from '../../providers/user/user.service';

@NgModule({
	declarations: [
		Login,
	],
	imports: [
		IonicPageModule.forChild(Login),
	],
	exports: [
		Login
	],
	providers: [
		AuthenticateProvider,
		UserProvider
	]
})
export class LoginModule {}
