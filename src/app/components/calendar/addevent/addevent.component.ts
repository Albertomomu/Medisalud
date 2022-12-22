import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { child, getDatabase, push, ref, update } from 'firebase/database';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.scss'],
})
export class AddeventComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  selectedDate;
  selectedTitle;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    if(this.selectedDate === undefined) {
      this.selectedDate = new Date().toISOString();
    }
    this.addEvent(this.selectedTitle, this.selectedDate.split('T')[0]);
    this.modalCtrl.dismiss('confirm');
  }

  addEvent(title: string, date: string) {
    // eslint-disable-next-line object-shorthand
    const eventData = {title: title, date: date};
    const db = getDatabase();
    const newKey = push(child(ref(db), 'events')).key;
    const updates = {};
    updates[newKey] = eventData;
    update(ref(db, 'events'), updates);
    window.location.reload();
  }

}
