import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Messages } from './messages';

import { PopoverMessages } from '../popovers/popover-messages/popover-messages';

@NgModule({
    declarations: [
        Messages,
        PopoverMessages
    ],    
    imports: [
        IonicPageModule.forChild(Messages)
    ],    
    exports: [        
        Messages        
    ],
    entryComponents: [
		PopoverMessages
	]
})

export class MessagesModule { }
