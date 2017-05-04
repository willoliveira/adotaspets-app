import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabSearch } from './tab-search';

@NgModule({
  declarations: [
    TabSearch,
  ],
  imports: [
    IonicPageModule.forChild(TabSearch),
  ],
  exports: [
    TabSearch
  ]
})
export class TabSearchModule {}
