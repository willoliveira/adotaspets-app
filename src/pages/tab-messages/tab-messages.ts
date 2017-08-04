import { Component } from '@angular/core';
import { DefaultPage } from '../../components/common/base.page';

import { App, IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

import { Messages } from '../messages/messages';
import { MessageService } from '../../services/message.service';

import { User } from '../../models/user.model';
import { Room, RoomType } from '../../models/room.model';

@Component({
	selector: 'page-tab-messages',
	templateUrl: 'tab-messages.html',
})
export class TabMessages extends DefaultPage {

    rooms: Room[] = [];

    constructor(
        loadingCtrl: LoadingController,
		toastCtrl: ToastController,
        storage: Storage,
        private app: App,
        private messageService: MessageService) {

        super(loadingCtrl, toastCtrl, storage);
    }

	ngOnInit() {
        this.getUserInfo().then(this.onSuccessGetInfoStorage.bind(this));
	}

	/**
	 * Abre pagina das mensagens
	 * @param msgError: String
	*/
	public openMessages(room) {
		this.app.getRootNav().push(Messages, { room });
    }

    private onSuccessGetInfoStorage(userInfo: User) {
        this.waitRequest = true;
        this.showLoading();
        this.messageService
            .getRoomsByUser(userInfo._id)
            .subscribe(
                this.onSuccessGetRooms.bind(this),
                this.onError.bind(this, "Erro ao carregar lista de mensagens")
            );
    }

    private onSuccessGetRooms(response) {
        this.waitRequest = false;
        this.hideLoading();
        if (response && response.content) {
            this.rooms = response.content;
        }
    }
}
