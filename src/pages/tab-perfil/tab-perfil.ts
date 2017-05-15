import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

@Component({
	selector: 'page-tab-perfil',
	templateUrl: 'tab-perfil.html',
})
export class TabPerfil {	
	public tab = "perfil";
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public actionsheetCtrl: ActionSheetController, public platform: Platform) {
	}
	
	ionViewDidLoad() {
		console.log('ionViewDidLoad TabPerfil');
	}

	openMenu() {
		let actionSheet = this.actionsheetCtrl.create({
			title: 'Ações',
			cssClass: 'action-sheets-basic-page',
			buttons: [
				{
				text: 'Editar',
				role: 'editar',
				icon: !this.platform.is('ios') ? 'create' : null,
				handler: () => {
					console.log('Delete clicked');
				}
				},
				{
				text: 'Alterar status',
				role: 'status',
				icon: !this.platform.is('ios') ? 'home' : null,
				handler: () => {
					console.log('Share clicked');
				}
				},								
				{
				text: 'Excluir',
				role: 'excluir', // will always sort to be on the bottom
				icon: !this.platform.is('ios') ? 'trash' : null,
				handler: () => {
					console.log('Cancel clicked');
				}
				},
				{
				text: 'Cancelar',
				role: 'cancelar', // will always sort to be on the bottom
				icon: !this.platform.is('ios') ? 'close' : null,
				handler: () => {
					console.log('Cancel clicked');
				}
				}
			]
		});
	
		actionSheet.present();
	}	
}
