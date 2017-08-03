import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { Home } from './home';
import { TabMessages } from '../tab-messages/tab-messages';
import { TabPerfil } from '../tab-perfil/tab-perfil';
import { TabSearch } from '../tab-search/tab-search';

import { Camera } from '@ionic-native/camera';

import { MessageService } from '../../services/message.service';

@NgModule({
	declarations: [
        Home,

		TabMessages,
		TabPerfil,
		TabSearch
	],
	entryComponents: [
		TabMessages,
		TabPerfil,
		TabSearch
	],
	imports: [
        HttpModule,
		IonicPageModule.forChild(Home)
	],
    providers: [
        Camera, MessageService
    ],
	exports: [
		Home
	]
})
export class HomeModule {}
