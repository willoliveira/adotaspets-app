import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { HomeModule } from '../pages/home/home.module';
import { LoginModule } from '../pages/login/login.module';
import { MessagesModule } from '../pages/messages/messages.module';
import { PerfilModule } from '../pages/perfil/perfil.module';
import { PetModule } from '../pages/pet/pet.module';
import { ResponsibleModule } from '../pages/responsible/responsible.module';

import { ModalFilter } from '../pages/modals/modal-filter/modal-filter';
import { ModalAddPet } from '../pages/modals/modal-add-pet/modal-add-pet';

import { Camera } from '@ionic-native/camera';
import { Facebook, FacebookLoginResponse  } from '@ionic-native/facebook';

@NgModule({
	declarations: [
		MyApp,

		ModalFilter,
		ModalAddPet
	],
	imports: [
		BrowserModule,

		HomeModule, LoginModule, MessagesModule,
		PerfilModule, PetModule, ResponsibleModule,

		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,

		ModalFilter,
		ModalAddPet
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},

		Camera, Facebook
	]
})
export class AppModule {}
