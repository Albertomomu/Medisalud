import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { UserService } from 'src/app/services/user.service';
import { getDatabase, onValue, ref } from 'firebase/database';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarViewComponent implements OnInit {

  admin = false;
  auth = this.userService.getAuth();
  user = this.auth.currentUser;
  userID = this.user.uid;
  events: any = [
    { title: 'Cumple', date: '2022-12-05', color: 'red' },
    { title: 'Fiesta', date: '2022-12-24' }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, bootstrap5Plugin, interactionPlugin],
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this),// MUST ensure `this` context is maintained
    events: this.events
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

  addEvent() {
  }

  deleteEvent() {

  }

}
