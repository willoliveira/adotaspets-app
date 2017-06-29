import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { HttpModule } from '@angular/http';

import { Login } from './login';

import { AuthenticateService } from '../../services/authenticate.service';
import { UserService } from '../../services/user.service';

@NgModule({
	declarations: [
		Login,
	],
	imports: [
		HttpModule,
		IonicPageModule.forChild(Login),
	],
	exports: [
		Login
	],
	providers: [
		AuthenticateService,
		UserService
	]
})
export class LoginModule {}
