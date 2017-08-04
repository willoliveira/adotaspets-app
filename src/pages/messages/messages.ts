import { Component } from '@angular/core';
import { DefaultPage } from '../../components/common/base.page';

import { IonicPage, NavController, NavParams, PopoverController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { PopoverMessages } from '../popovers/popover-messages/popover-messages';

import { Room } from '../../models/room.model';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';

@IonicPage()
@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html'
})

export class Messages extends DefaultPage {

    room: Room;
    userInfo: User;
    messages: Array<Message>;

    constructor(
        loadingCtrl: LoadingController,
		toastCtrl: ToastController,
        storage: Storage,
        public navParams: NavParams,
        public popoverCtrl: PopoverController,
        public messageService: MessageService) {

        super(loadingCtrl, toastCtrl, storage);
        this.room = this.navParams.get("room");
        console.log(this.room);
    }

    ngOnInit() {
        this.getUserInfo().then((user) => {
            this.userInfo = user;
            this.getMessages();
        });
    }

    getParticipant() {
        if (this.room && this.userInfo)
            return this.room.participants.find(user => user._id !== this.userInfo._id).name || "";
        return "";
    }

    getMessages(date?: string) {
        this.messageService
            .getRoomMessages({ date: date, roomId: this.room._id })
            .subscribe(this.onSuccessGetMessages.bind(this));
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverMessages);

        popover.present({
            ev: myEvent
        });
    }

    onSuccessGetMessages(response) {
        if (response && response.content) {
            this.messages = response.content;
        }
    }
}
