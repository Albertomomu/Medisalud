import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarViewComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, bootstrap5Plugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // MUST ensure `this` context is maintained
    events: [
      { title: 'Cumple mami', date: '2022-12-05' },
      { title: 'Navidad', date: '2022-12-24' }
    ]
  };

  constructor() { }

  ngOnInit() {}

  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr);
  }


}
