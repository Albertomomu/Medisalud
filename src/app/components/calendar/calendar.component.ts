import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarViewComponent implements OnInit {

  calendarOptions: CalendarOptions = {

    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'timeGridDay',
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
    ]

  };

  eventsPromise: Promise<EventInput>;

  constructor() { }

  ngOnInit() {}

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  };

}
