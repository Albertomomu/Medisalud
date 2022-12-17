import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { UserService } from 'src/app/services/user.service';
import { child, getDatabase, onValue, push, ref, update } from 'firebase/database';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';

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
    eventClick: this.handleEventClick.bind(this),// MUST ensure `this` context is maintained
    events: this.events,
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(this.userID === '1TFEAGKXhFVx14BykPh9pdOVTaz1'){
      this.admin = true;
    }
  }

  handleEventClick(arg) {
    console.log(arg.event.start);
    console.log(arg.event.title);
  }
  //WORKING
  addEvent(title: string, date: string) {
    // eslint-disable-next-line object-shorthand
    const eventData = {title: title, date: date};
    const db = getDatabase();
    const newKey = push(child(ref(db), 'events')).key;
    const updates = {};
    updates[newKey] = eventData;
    update(ref(db, 'events'), updates);
  }

  deleteEvent() {

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.addEvent(this.selectedTitle, this.selectedDate.split('T')[0]);
    this.modal.dismiss('confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

}
