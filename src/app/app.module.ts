import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { AdotaPets } from './app.component';

import { HomeModule } from '../pages/home/home.module';
import { LoginModule } from '../pages/login/login.module';
import { MessagesModule } from '../pages/messages/messages.module';
import { PerfilModule } from '../pages/perfil/perfil.module';
import { PetModule } from '../pages/pet/pet.module';
import { ResponsibleModule } from '../pages/responsible/responsible.module';
import { AddPet } from '../pages/modals/add-pet/add-pet';

import { ModalFilter } from '../pages/modals/modal-filter/modal-filter';

import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Facebook, FacebookLoginResponse  } from '@ionic-native/facebook';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';

import { PetService } from '../services/pet.service';

@NgModule({
	declarations: [
		AdotaPets,

        ModalFilter,
		AddPet
	],
	imports: [
		BrowserModule,

		HomeModule, LoginModule, MessagesModule,
		PerfilModule, PetModule, ResponsibleModule,

		IonicModule.forRoot(AdotaPets),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		AdotaPets,

        ModalFilter,
		AddPet
	],
	providers: [
		StatusBar,
		SplashScreen,
		{provide: ErrorHandler, useClass: IonicErrorHandler},

		Camera, ImagePicker, Facebook, BackgroundMode, Geolocation,
		PetService
	]
})
export class AppModule {}
