import { Component } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { getDatabase, onValue, ref, update, set } from 'firebase/database';

@Component({
  selector: 'app-modal-example',
  templateUrl: 'raffle-settings.component.html',
})
export class RaffleSettingsComponent {
  selectedTime: any;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {

    const db = getDatabase();
    set(ref(db, 'raffle'), {
    endTime: this.selectedTime.split('T')[0]
  });
  return this.modalCtrl.dismiss('confirm');
  }
}
