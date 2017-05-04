import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home } from './home';

import { TabMessages } from '../tab-messages/tab-messages';
import { TabPerfil } from '../tab-perfil/tab-perfil';
import { TabSearch } from '../tab-search/tab-search';

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
		IonicPageModule.forChild(Home),
	],
	exports: [
		Home
	]
})
export class HomeModule {}
