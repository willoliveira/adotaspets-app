import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Responsible } from './responsible';

@NgModule({
  declarations: [
    Responsible,
  ],
  imports: [
    IonicPageModule.forChild(Responsible),
  ],
  exports: [
    Responsible
  ]
})
export class ResponsibleModule {}
