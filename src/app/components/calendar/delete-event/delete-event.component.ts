import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { getDatabase, ref, onValue } from 'firebase/database';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss'],
})
export class DeleteEventComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  events: any = [];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    const db = getDatabase();
    const eventsRef = ref(db, 'events');
    onValue(eventsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.events.push(childSnapshot.val());
      });
    });
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const checkeds = Array.prototype.slice.call(document.getElementsByClassName('eventsC'));
    const checkedsArr = [];
    checkeds.forEach((checkt) => {
      if(checkt.checked === true){
        checkedsArr.push(checkt);
      }
    });
    this.delete(checkedsArr);
    this.modalCtrl.dismiss('confirm');
  }

  delete(arr){
    console.log(arr);
  }

}
