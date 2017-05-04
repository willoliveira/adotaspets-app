import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabPerfil } from './tab-perfil';

@NgModule({
  declarations: [
    TabPerfil,
  ],
  imports: [
    IonicPageModule.forChild(TabPerfil),
  ],
  exports: [
    TabPerfil
  ]
})
export class TabPerfilModule {}
