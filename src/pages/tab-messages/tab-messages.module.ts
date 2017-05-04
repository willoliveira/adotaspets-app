import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabMessages } from './tab-messages';

@NgModule({
  declarations: [
    TabMessages,
  ],
  imports: [
    IonicPageModule.forChild(TabMessages),
  ],
  exports: [
    TabMessages
  ]
})
export class TabMessagesModule {}
