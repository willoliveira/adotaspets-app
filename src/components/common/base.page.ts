import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({})
export class DefaultPage {

    public waitRequest: Boolean = false;

    private loader;
    private toaster;

	constructor(
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
        public storage: Storage
    ) { }


    public getUserInfo(): Promise<any> {
        return this.storage
            .get('userInfo')
            .catch(this.onError.bind(this, "Error get in storage"));
    }

    /**
     * Show preloader
    */
	public showLoading () {
		this.loader = this.loadingCtrl.create({ content: "Loading" });
		this.loader.present();
    }

    /**
     * Hide Loader
     */
    public hideLoading () {
        this.loader && this.loader.dismiss && this.loader.dismiss();
	}

    /**
     * Show toast
     * @param msg: String
    */
	public presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000
		});
		toast.present();
	}

	public onError(msgError) {
        this.hideLoading();
		this.presentToast(msgError);
	}
}
