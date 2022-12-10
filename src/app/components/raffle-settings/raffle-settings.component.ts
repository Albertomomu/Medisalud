import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { getDatabase } from 'firebase/database';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'raffle-settings.component.html',
})
export class RaffleSettingsComponent {
  selectedTime: Date;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    /* return this.modalCtrl.dismiss(this.selectedTime, 'confirm'); */
    const db = getDatabase();
  }
}