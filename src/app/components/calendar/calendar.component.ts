import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import momentPlugin from '@fullcalendar/moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarViewComponent implements OnInit {

  presentDays = 0;
  absentDays = 0;
  events: any = [
    { title: 'Present', date: '2022-12-05', color: 'red' },
    { title: 'Absent', date: '2022-12-24' }
  ];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, bootstrap5Plugin, interactionPlugin, momentPlugin],
    initialView: 'dayGridMonth',
    eventClick: this.handleDateClick.bind(this),// MUST ensure `this` context is maintained
    events: this.events
  };

  constructor() { }

  ngOnInit() {
    this.events.forEach((e: {[x: string]: string }) => {
      if(e.title === 'Present'){
        this.presentDays++;
      }else{
        this.absentDays++;
      }
    });
    console.log(this.presentDays);
    console.log(this.absentDays);
  }

  handleDateClick(arg) {
    console.log(arg.event.title);
  }

}
