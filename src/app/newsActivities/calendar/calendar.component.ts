import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {CalendarOptions} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  events:any[] =[
    {title: 'event 1', date: '2023-06-01', color: 'red'},
    {title: 'event 2', date: '2023-06-02'},
    {title: 'event 3', date: '2023-06-03'}
  ]

  // basic calendar options
  calendarOptions: CalendarOptions = {
    events: this.events,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,
    interactionPlugin],
    weekends: true,
    dateClick: this.handleDateClick.bind(this)

  };

  handleDateClick(arg:any){
    console.log('date click!   '+ arg.dateStr);
    const matchingEvents = this.events.filter(event => event.date ===arg.dateStr);
    console.log(matchingEvents);
  }


}
