import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';

import { Messages } from '../messages/messages';

@Component({
    selector: 'page-tab-messages',
    templateUrl: 'tab-messages.html',
})

export class TabMessages {
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  public openMessages() {
      this.app.getRootNav().push(Messages);
  }
}
