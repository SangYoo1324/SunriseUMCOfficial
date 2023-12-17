import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import {CalendarOptions} from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
import {MatDialog} from "@angular/material/dialog";
import {EventModalComponent} from "./event-modal/event-modal.component";
import {Subject, takeUntil} from "rxjs";
import {ContentServiceService} from "../../service/content-service.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  // subscirbe에 takeUntil pipe를 달아줘서 destroy 될 때  이 스트림에 값을 방출만 하면 바로 해제됨
  private destroy$ = new Subject<void>();

  events:any[] =[
    {title: 'event 1', date: '2023-06-01', time:'10:10',  cloudinaryUrl: "/assets/board.jpeg",
      description: "This is the Description of the Event details", color: 'red'},
    {title: 'event 2', date: '2023-06-02', time:'10:10',  cloudinaryUrl: "/assets/board.jpeg",
      description: "This is the Description of the Event details"},
    {title: 'event 3', date: '2023-06-03', time:'10:10',  cloudinaryUrl: "/assets/board.jpeg",
      description: "This is the Description of the Event details"}
  ]

  // basic calendar options
  calendarOptions: CalendarOptions = {
    events: this.events,
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin,
    interactionPlugin],
    weekends: true,
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.openDialog.bind(this)

  };

  ngOnInit(){

    this.contentService.calendarEventStream.pipe(takeUntil(this.destroy$)).subscribe((subj)=>{
      subj.pipe(takeUntil(this.destroy$)).subscribe((obs:any)=>{
        console.log(obs);
       this.calendarOptions.events = obs;
      })
    });

    // JavaScript로 aria-label이 'example'인 요소 선택
    setTimeout(()=>{
      const sundayElement = document.querySelector('[aria-label="Sunday"]');
      console.log(sundayElement);
      // 선택한 요소에 스타일 적용
      if (sundayElement instanceof HTMLElement) {
        sundayElement.style.color = 'red';
        // 다른 스타일을 적용할 수 있음
      }

      const saturdayElement = document.querySelector('[aria-label="Saturday"]');
      console.log(saturdayElement);
      // 선택한 요소에 스타일 적용
      if (saturdayElement instanceof HTMLElement) {
        saturdayElement.style.color = 'blue';
        // 다른 스타일을 적용할 수 있음
      }

    }, );
  }


  handleDateClick(arg:any){
    console.log('date click!   '+ arg.dateStr);
    const matchingEvents = this.events.filter(event => event.date ===arg.dateStr);
    console.log(matchingEvents);
  }

  constructor(public dialog:MatDialog, private contentService:ContentServiceService) {
  }

  openDialog(arg:any){
    // console.log('date click!'+ JSON.stringify(arg, null, 2));
    // console.log(arg.el.fcSeg.eventRange.def.title);
    console.log(arg.el.fcSeg.eventRange);
    let data ={
      title: arg.el.fcSeg.eventRange.def.title,
      date: arg.el.fcSeg.eventRange.range.end.toString().slice(0,10),
      ...arg.el.fcSeg.eventRange.def.extendedProps

    }
    console.log(JSON.stringify(data, null, 2));

  let matDialogRef =  this.dialog.open(EventModalComponent,{data});

  // dialog 닫힌 후 추가 액션
  matDialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe((res)=>{
    console.log("dialog closed"+`${res}`);
  })
  }


  ngOnDestroy(){
      this.destroy$.next();
      this.destroy$.complete();
  }
}



