import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { getDatabase, ref, onValue, remove, child } from 'firebase/database';

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

  getCheckedItems() {
    const checkedItems = this.events
      .filter((event) => event.checked);
    return checkedItems;
  }

  confirm() {
    const checkedItems = this.getCheckedItems();
    this.delete(checkedItems);
    this.modalCtrl.dismiss('confirm');
  }

  delete(checkedItems){
    const db = getDatabase();
    console.log(checkedItems);
    const eventsRef = ref(db, 'events');
    onValue(eventsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        checkedItems.forEach((item) =>{
          if(item.title === childSnapshot.val().title && item.date === childSnapshot.val().date){
            const evRef = ref(db, 'events/' + childSnapshot.key);
            remove(evRef);
            window.location.reload();
          }
        });
      });
    });
  }

}
