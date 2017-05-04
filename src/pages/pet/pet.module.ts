import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pet } from './pet';

@NgModule({
  declarations: [
    Pet,
  ],
  imports: [
    IonicPageModule.forChild(Pet),
  ],
  exports: [
    Pet
  ]
})
export class PetModule {}
