import { Component } from '@angular/core';
import { NavController, NavParams, ViewController  } from 'ionic-angular';

@Component({
	selector: 'edit-user',
	templateUrl: 'edit-user.html'
})

export class ModalEditUser {    
	private userInfo;

	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
	}
	
	ngOnInit () {
		this.initPage(this.navParams.get("userInfo"));
	}

    dismiss() {
        this.viewCtrl.dismiss(this.userInfo);
	}
	
	private initPage(userInfo) {		
		if (userInfo)
			this.userInfo = userInfo;					
	}
}
