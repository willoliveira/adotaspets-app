import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, ModalController, ToastController } from 'ionic-angular';

import { Pet } from '../pet/pet';
import { ModalFilter } from '../modals/modal-filter/modal-filter';

@Component({
	selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})

export class TabSearch {    
    public desabled: Boolean = true;    

    public anima = {
        waitRequest: true,
        zIndex1: true,
        likePet: false,
        notlikePet: false,
        containerSearching: false
    };

    @ViewChild('currentCardPet') currentCardPet:ElementRef;    

	constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public app: App) {   
        this.anima.containerSearching = true;         
        this.getCurrentPet();
	}

    getCurrentPet () {
        this.anima.waitRequest = true;
        this.anima.zIndex1 = true;
        this.anima.likePet = false;
        this.anima.notlikePet = false;              

        /*simula uma requisicao para mostrar tela de searching*/
        setTimeout(function () {
            this.desabled = false;
            this.anima.zIndex1 = false;
            this.anima.waitRequest = false;            
        }.bind(this), 3000);
    }

	openModal() {
		let modal = this.modalCtrl.create(ModalFilter);
		modal.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad TabSearch');
	}

	public goToInfoPet() {
		this.app.getRootNav().push(Pet);
	}

    likePet () {  
        if (this.desabled)
            return null;        

        this.anima.containerSearching  = true;
        this.anima.likePet = true;

        let elemCardPet = this.currentCardPet.nativeElement;
        elemCardPet.addEventListener("animationend", this.animationendCard.bind(this), false);                

        let toast = this.toastCtrl.create({
            message: 'Uma nova conversa com o responsável foi criada na aba de mensagens.',
            duration: 5000,
        });

        toast.present();        
    }    

    notlikePet () {        
        if (this.desabled)
            return null;

        console.log("asa");

        this.anima.containerSearching  = true;
        this.anima.notlikePet = true;        
        
        let elemCardPet = this.currentCardPet.nativeElement;
        elemCardPet.addEventListener("animationend", this.animationendCard.bind(this), false);                
    }    

    animationendCard () {        
        this.getCurrentPet();
    }
}
