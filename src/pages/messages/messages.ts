import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { PopoverMessages } from '../popovers/popover-messages/popover-messages';

@IonicPage()
@Component({
    selector: 'page-messages',
    templateUrl: 'messages.html'
})

export class Messages {
    constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverMessages);

        popover.present({
            ev: myEvent
        });
    }
}
