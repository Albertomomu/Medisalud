import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { UserService } from 'src/app/services/user.service';
import { child, getDatabase, onValue, push, ref, update } from 'firebase/database';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal, ModalController } from '@ionic/angular';
import { AddeventComponent } from './addevent/addevent.component';
import { DeleteEventComponent } from './delete-event/delete-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarViewComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  admin = false;
  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  userID = this.user.uid;
  events: any = [];
  selectedDate;
  selectedTitle;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, bootstrap5Plugin, interactionPlugin],
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this),// MUST ensure `this` context is maintained],
  };

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController
    ) { }

  ngOnInit() {
    if(this.userID === '1TFEAGKXhFVx14BykPh9pdOVTaz1'){
      this.admin = true;
    }
    const db = getDatabase();
    const eventsRef = ref(db, 'events');
    onValue(eventsRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.events.push(childSnapshot.val());
      });
      this.calendarOptions.events = this.events;
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: AddeventComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }

  async openModal2() {
    const modal = await this.modalCtrl.create({
      component: DeleteEventComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }

  handleEventClick(arg) {
    console.log(arg.event.start);
    console.log(arg.event.title);
  }

  deleteEvent() {

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

}
