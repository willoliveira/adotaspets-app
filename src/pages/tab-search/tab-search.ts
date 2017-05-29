import { Component, ViewChild, ElementRef } from '@angular/core';
import { App, ModalController, ToastController } from 'ionic-angular';

import { Pet } from '../pet/pet';
import { ModalFilter } from '../modals/modal-filter/modal-filter';

@Component({
	selector: 'page-tab-search',
	templateUrl: 'tab-search.html',
})

export class TabSearch {
    public zIndexFabs: Number = 1;
    public waitRequest: Boolean = true;

    public anima = {
        likePet: false,
        cardPet: false,
        notlikePet: false,
        containerSearching: true
    };

    @ViewChild('currentCardPet') currentCardPet:ElementRef;

	constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public app: App) {}

    ngOnInit () {
        this.getCurrentPet();
    }

    getCurrentPet () {
        this.zIndexFabs = 1;
        this.waitRequest = true;
        this.anima.likePet = this.anima.notlikePet = this.anima.cardPet = false;

        setTimeout(function () {
            this.zIndexFabs = 999;
            this.waitRequest = this.anima.containerSearching = false;
            this.anima.cardPet = true;
        }.bind(this), 3000);
    }

	openModal() {
		let modal = this.modalCtrl.create(ModalFilter);
		modal.present();
	}

	public goToInfoPet() {
		this.app.getRootNav().push(Pet);
	}

    likePet () {
        if (this.anima.containerSearching)
            return null;

        this.anima.containerSearching = this.anima.likePet = true;

        let elemCardPet = this.currentCardPet.nativeElement;
        elemCardPet.addEventListener("animationend", this.animationendCard.bind(this));

        let toast = this.toastCtrl.create({
            message: 'Uma nova conversa com o responsável foi criada na aba de mensagens.',
            duration: 5000,
        });

        toast.present();
    }

    notlikePet () {
        if (this.anima.containerSearching)
            return null;

        this.anima.containerSearching = this.anima.notlikePet = true;

        let elemCardPet = this.currentCardPet.nativeElement;
        elemCardPet.addEventListener("animationend", this.animationendCard.bind(this));
    }

    animationendCard (event) {
        event.target.removeEventListener("animationend", this.animationendCard.bind(this));
        this.getCurrentPet();
    }
}
